import { ApiPromise, WsProvider } from '@polkadot/api';
import { SUPPORTED_TOKENS } from './supported-tokens';
import { exportWalletKeys } from './export';
import { getTokenBalanceForUser } from './balance';

export const sendTransfer = async (  userId: string,
  tokenSymbol: string,
  to: string,
  amountHuman: number) => {

  let tokens = SUPPORTED_TOKENS.filter(t => t.symbol.toUpperCase() === tokenSymbol.toUpperCase());
  if (!tokens || tokens.length === 0) {
    throw new Error(`Token ${tokenSymbol} no soportado`);
  } 

  let token: any; 

  for (const t of tokens) {
    // check balance in that chain
    const balance = await getTokenBalanceForUser(userId, t.symbol, t.chain);
    if (balance && BigInt(balance.balance) >= BigInt(amountHuman * 10 ** t.decimals)) {
      token = t;
      break;
    }
  }

  if (!token) {
    throw new Error(`No tienes suficiente ${tokenSymbol} para enviar`);
  }
    
  console.log(`Enviando ${amountHuman} ${token.symbol} a ${to}...`);

  const wsProvider = new WsProvider(token.rpc);
  const api = await ApiPromise.create({ provider: wsProvider });

  console.log(`Conectado a ${token.chain} (${token.rpc})`);
  await api.isReady;
  console.log(`API lista para ${token.chain}`);

  const pair = await exportWalletKeys(userId);
  const amount = BigInt(amountHuman * 10 ** token.decimals);

  let tx;
  if (token.type === 'native') {
    tx = api.tx.balances.transferKeepAlive(to, amount);
    console.log(`Enviando ${amountHuman} ${tokenSymbol} a ${to}`);
  } else if (token.type === 'asset') {
    tx = api.tx.assets.transferKeepAlive(token.assetId, to, amount);
    console.log(`Enviando ${amountHuman} ${tokenSymbol} (Asset ID: ${token.assetId}) a ${to}`);
  } else {
    throw new Error('Tipo de token no soportado');
  }

  const hash = await tx.signAndSend(pair);
  console.log(`✅ Enviado ${amountHuman} ${tokenSymbol} a ${to}`);

  await api.disconnect();

  return hash.toHex();
};
