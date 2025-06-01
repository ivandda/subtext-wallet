import { Keyring } from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loadWalletData = async (userId: string) => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  const miniSecret = mnemonicToMiniSecret(wallet.mnemonic);
  const privateKeyHex = Buffer.from(miniSecret).toString('hex');

  return {
    mnemonic: wallet.mnemonic,
    address: wallet.address,
    publicKey: wallet.publicKey,
    privateKey: privateKeyHex,
  };
};

export const exportWalletKeys = async (userId: string): Promise<KeyringPair> => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromUri(wallet.mnemonic);
  return pair;
};