import { mnemonicGenerate, cryptoWaitReady, encodeAddress } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveWallet = async (userId: string, data: { mnemonic: string; address: string; publicKey: string }) => {
  try {
    const newWallet = await prisma.wallet.create({
      data: {
        userId,
        mnemonic: data.mnemonic,
        address: data.address,
        publicKey: data.publicKey,
      },
    });
    return {
      address: newWallet.address,
      mnemonic: newWallet.mnemonic,
      new: true,
    };

  } catch (error) {
    console.error(`Error saving wallet for user ${userId}:`, error);
    throw new Error('Failed to save wallet');
  }
};

const findWallet = async (userId: string) => {
  const existingWallet = await prisma.wallet.findUnique({
      where: {
        userId,
      },
    });
    if(existingWallet) {
      console.log(`Wallet already exists for user ${userId}, skipping creation.`);
      return {
        address: existingWallet.address,
        mnemonic: existingWallet.mnemonic,
        new: false,
      }
    }
    return null;
};

export const createWalletForUser = async (userId: string) => {
  await cryptoWaitReady(); // inicializa crypto WASM

  const existingWallet = await findWallet(userId);
  if (existingWallet) {
    const keyring = new Keyring({ type: 'sr25519' });
    const oldPair = keyring.addFromUri(existingWallet.mnemonic);
    const address = encodeAddress(oldPair.publicKey, 42);
    existingWallet.address = address;
    return existingWallet;
  }

  const mnemonic = mnemonicGenerate();

  // Create key pair from mnemonic
  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromUri(mnemonic);

  const address = encodeAddress(pair.publicKey, 42); // 0 is the prefix for Polkadot/Substrate, 42 is for testnet

  const savedWallet = await saveWallet(userId, {
    mnemonic,
    address,
    publicKey: u8aToHex(pair.publicKey),
  });

  if (!savedWallet) {
    throw new Error('Failed to create wallet');
  }

  return savedWallet;
};


