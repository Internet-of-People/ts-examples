import { promises as fs } from 'fs';
import { Crypto } from '@internet-of-people/sdk';
import { getHydraPrivate, getMorpheusPrivate } from './common';

export const vaultInit = async(path: string, unlockPassword: string, network: string): Promise<string> => {
  const mnemonic = new Crypto.Bip39('en').generate().phrase;
  const vault = Crypto.Vault.create(mnemonic, '', unlockPassword);
  
  // Getting the private interface calls the Hydra and the Morpheus init function
  getHydraPrivate(vault, unlockPassword, network);
  getMorpheusPrivate(vault, unlockPassword);

  await saveVaultTo(vault, path);
  return mnemonic;
};

async function saveVaultTo(vault: Crypto.Vault, path: string): Promise<void> {
  const serialized = JSON.stringify(vault.save());
  await fs.writeFile(path, serialized, { encoding: 'utf-8' });
}