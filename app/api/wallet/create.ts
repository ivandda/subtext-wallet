import { mnemonicGenerate, cryptoWaitReady, encodeAddress } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveWallet = async (userId: string, data: { mnemonic: string; address: string; publicKey: string }) => {
  await prisma.wallet.create({
    data: {
      userId,
      mnemonic: data.mnemonic,
      address: data.address,
      publicKey: data.publicKey,
    },
  });
};

export const createWalletForUser = async (userId: string) => {
  await cryptoWaitReady(); // inicializa crypto WASM

  // Generar mnemonico
  const mnemonic = mnemonicGenerate();

  // Crear par de claves
  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromUri(mnemonic);

  // Obtener dirección en formato Substrate
  const address = encodeAddress(pair.publicKey, 0); // 0 es el prefix para Polkadot/Substrate

  saveWallet(userId, {
    mnemonic,
    address,
    publicKey: u8aToHex(pair.publicKey),
  });

  console.log(`✅ Wallet creada para ${userId}`);
  console.log(`📬 Dirección: ${address}`);

  return { address, mnemonic };
};
