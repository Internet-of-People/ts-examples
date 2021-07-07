import { promises as fs } from 'fs';
import { Crypto } from '@internet-of-people/sdk';

const unlockPassword = 'correct horse battery staple';

export const vaultInit = async(path: string): Promise<void> => {
  const vault = Crypto.Vault.create(Crypto.Seed.demoPhrase(), '', unlockPassword);
  Crypto.MorpheusPlugin.init(vault, unlockPassword);
  const serialized = JSON.stringify(vault.save());
  await fs.writeFile(path, serialized, { encoding: 'utf-8' });
};
