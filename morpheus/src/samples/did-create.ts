import { promises as fs } from 'fs';
import { Crypto } from '@internet-of-people/sdk';

const unlockPassword = 'correct horse battery staple';

export const didCreate = async (vaultPath: string): Promise<void> => {
  const serializedVault = await fs.readFile(vaultPath, { encoding: 'utf-8' });
  const vault = Crypto.Vault.load(JSON.parse(serializedVault));

  const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);
  const priv = morpheusPlugin.priv(unlockPassword);

  // adds a new did at the next index
  const did = priv.personas.did(priv.personas.count);

  const serializedUpdatedVault = JSON.stringify(vault.save());
  await fs.writeFile(vaultPath, serializedUpdatedVault, { encoding: 'utf-8' });

  console.log('New did was created', did.toString());
};
