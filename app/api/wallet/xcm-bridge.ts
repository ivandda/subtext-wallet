import { ApiPromise, WsProvider } from "@polkadot/api";
import { SUPPORTED_TOKENS } from "./supported-tokens";
import { exportWalletKeys } from "./export";
import { KeyringPair } from "@polkadot/keyring/types";

/**
 * A generalized function to transfer an asset via XCM between any two chains.
 * @param api The ApiPromise instance connected to the source chain.
 * @param sender The sender's keypair.
 * @param destParaId The destination parachain/relay chain ID.
 * @param recipient The recipient's account (as SS58 string).
 * @param assetLocation The MultiLocation of the asset to be transferred.
 * @param amount The amount to transfer (as string or BN).
 */
async function xcmTransfer({
  api,
  sender,
  destParaId,
  recipient,
  assetLocation,
  amount,
}: {
  api: ApiPromise;
  sender: KeyringPair;
  destParaId: number;
  recipient: string;
  assetLocation: { Concrete: { parents: number; interior: string } };
  amount: bigint;
}) {
  const dest = api.createType('XcmVersionedLocation', {
    V3: destParaId === 0 
      ? { parents: 0, interior: 'Here' }
      : { parents: 1, interior: { X1: { Parachain: destParaId } } }
  });

  const beneficiary = api.createType('XcmVersionedLocation', {
    V3: {
      parents: 0,
      interior: { 
        X1: { 
          AccountId32: { 
            network: null,
            id: api.createType('AccountId32', recipient).toHex()
          }
        }
      }
    }
  });

  const assets = api.createType('XcmVersionedAssets', {
    V3: [{
      id: {
        Concrete: assetLocation.Concrete
      },
      fun: {
        Fungible: amount
      }
    }]
  });

  const weightLimit = api.createType('XcmV3WeightLimit', { Unlimited: null });

  // Try different XCM pallets based on what's available on the chain
  let tx;
  
  if (api.tx.polkadotXcm?.limitedReserveTransferAssets) {
    console.log('Using polkadotXcm.limitedReserveTransferAssets');
    tx = api.tx.polkadotXcm.limitedReserveTransferAssets(
      dest,
      beneficiary,
      assets,
      0, // feeAssetItem
      weightLimit
    );
  } else if (api.tx.xcmPallet?.limitedReserveTransferAssets) {
    console.log('Using xcmPallet.limitedReserveTransferAssets');
    tx = api.tx.xcmPallet.limitedReserveTransferAssets(
      dest,
      beneficiary,
      assets,
      0, // feeAssetItem
      weightLimit
    );
  } else if (api.tx.xcmPallet?.reserveTransferAssets) {
    console.log('Using xcmPallet.reserveTransferAssets');
    tx = api.tx.xcmPallet.reserveTransferAssets(
      dest,
      beneficiary,
      assets,
      0 // feeAssetItem
    );
  } else {
    throw new Error('No suitable transfer method found on this chain');
  }

  return new Promise((resolve, reject) => {
    tx.signAndSend(sender, ({ status, dispatchError, txHash }) => {
      if (status.isInBlock) {
        console.log('XCM transfer included in block:', status.asInBlock.toHex());
        console.log('Transaction hash:', txHash.toHex());
      } else if (status.isFinalized) {
        if (dispatchError) {
          let errorMessage;
          
          if (dispatchError.isModule) {
            // For module errors, try to decode the error
            const decoded = api.registry.findMetaError(dispatchError.asModule);
            errorMessage = `${decoded.section}.${decoded.name}: ${decoded.docs.join(' ')}`;
          } else {
            // For other errors, convert to string
            errorMessage = dispatchError.toString();
          }
          
          console.error('❌ Transfer failed at finalization:', errorMessage);
          reject(new Error(errorMessage));
        } else {
          console.log('Transfer finalized:', status.asFinalized.toHex());
          resolve(txHash.toHex());
        }
      } else if (dispatchError) {
        console.error('Transfer failed:', dispatchError.toString());
        reject(new Error(dispatchError.toString()));
      }
    });
  });
}

export async function crossChainBridge({
  sourceChain,
  destChain,
  senderId,
  assetName,
  amountHuman
}: {sourceChain: string, destChain: string, senderId: string, assetName: string, amountHuman: number}) {

  const sourceChainRpc = SUPPORTED_TOKENS.find(token => token.chain.toLowerCase() === sourceChain.toLowerCase())?.rpc;
  if (!sourceChainRpc) {
    throw new Error(`Source chain ${sourceChain} not supported`);
  }
  console.log(`Source chain RPC: ${sourceChainRpc}`);
  const destChainInfo = SUPPORTED_TOKENS.find(token => token.chain.toLowerCase() === destChain.toLowerCase());
  if (!destChainInfo) {
    throw new Error(`Destination chain ${destChain} not supported`);
  }
  console.log(`Destination chain RPC: ${destChainInfo.rpc}`);
  const destParaId = destChainInfo.parachainId ?? 0; // Default to relay chain if not specified
  console.log(`Destination parachain ID: ${destParaId}`);

  const wsProviderSource = new WsProvider(sourceChainRpc);
  const apiSource = await ApiPromise.create({ provider: wsProviderSource });

  console.log(`Connecting to source chain at ${sourceChainRpc}`);
  
  await apiSource.isReady;
  
  console.log(`Connected to source chain. Initiating transfer...`);

  const sender = await exportWalletKeys(senderId);
  if (!sender) {
    throw new Error(`Sender wallet not found for user ID: ${senderId}`);
  }

  // Human amount to BigInt
  const tokenInfo = SUPPORTED_TOKENS.find(token => token.symbol.toLowerCase() === assetName.toLowerCase() && token.chain.toLowerCase() === sourceChain.toLowerCase());
  if (!tokenInfo) {
    throw new Error(`Asset ${assetName} not supported in source chain ${sourceChain}`);
  }
  const amount = BigInt(amountHuman * 10 ** tokenInfo.decimals);

  // get multilocation of token in source chain
  const assetLocation = tokenInfo.multiLocation || { Concrete: { parents: 0, interior: 'Here' } };

  // Check sender balance before transfer
  const senderBalance: any = await apiSource.query.system.account(sender.address);
  if (senderBalance.isEmpty) {
    throw new Error(`Sender account ${sender.address} not found or has no balance`);
  }
  const freeBalance = senderBalance["data"]["free"].toBigInt();

  if (freeBalance < amount) {
    throw new Error(`Insufficient balance. Have: ${freeBalance.toString()}, Need: ${amount.toString()}`);
  }
  
  const result = await xcmTransfer({
    api: apiSource,
    sender,
    destParaId,
    recipient: sender.address,
    assetLocation,
    amount
  });

  console.log('Bridge:', result);

  await apiSource.disconnect();

  return result;
}