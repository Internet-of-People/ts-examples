import { promises as fs } from 'fs';
import { Crypto } from '@internet-of-people/sdk';
import { loadVaultFromFile } from '../utils';

export const didCreate = async (vaultPath: string, unlockPassword: string): Promise<void> => {
  const vault = await loadVaultFromFile(vaultPath);

  const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);
  const priv = morpheusPlugin.priv(unlockPassword);

  // adds a new did at the next index
  const did = priv.personas.did(priv.personas.count);

  const serializedUpdatedVault = JSON.stringify(vault.save());
  await fs.writeFile(vaultPath, serializedUpdatedVault, { encoding: 'utf-8' });

  console.log('New did was created', did.toString());
};
