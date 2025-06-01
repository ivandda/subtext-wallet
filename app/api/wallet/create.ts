import { mnemonicGenerate, cryptoWaitReady, encodeAddress } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveWallet = async (userId: string, data: { mnemonic: string; address: string; publicKey: string }) => {
  try {
    await prisma.wallet.create({
      data: {
        userId,
        mnemonic: data.mnemonic,
        address: data.address,
        publicKey: data.publicKey,
      },
    });
  } catch (error) {
    console.error(`Error saving wallet for user ${userId}:`, error);
    throw new Error('Failed to save wallet');
  }
};

export const createWalletForUser = async (userId: string) => {
  await cryptoWaitReady(); // inicializa crypto WASM

  const mnemonic = mnemonicGenerate();

  // Create key pair from mnemonic
  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromUri(mnemonic);

  const address = encodeAddress(pair.publicKey, 0); // 0 is the prefix for Polkadot/Substrate

  saveWallet(userId, {
    mnemonic,
    address,
    publicKey: u8aToHex(pair.publicKey),
  });

  console.log(`✅ Wallet creada para ${userId}`);
  console.log(`📬 Dirección: ${address}`);

  return { address, mnemonic };
};
