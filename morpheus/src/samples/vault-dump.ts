import { promises as fs } from 'fs';
import { Crypto } from '@internet-of-people/sdk';

const unlockPassword = 'correct horse battery staple';

export const vaultLoadAndDump = async(path: string): Promise<void> => {
  console.log('### Vault Dump ###');
  console.log(`- Path: ${path}`);
  const serialized = await fs.readFile(path, { encoding: 'utf-8' });
  const vault = Crypto.Vault.load(JSON.parse(serialized));

  try {
    Crypto.MorpheusPlugin.init(vault, unlockPassword);
  } catch (_) {
    /* No problem if it was already initialized */
  }

  const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);
  const kind = morpheusPlugin.pub.personas;

  console.log('- Key Ids:');

  for (let i = 0; i < kind.count; ++i) {
    const pk = kind.key(i);
    const id = pk.keyId();
    console.log(`  - ${i}: ${id.toString()}`);
  }

  console.log('- DIDs:');

  for (let i = 0; i < kind.count; ++i) {
    const pk = kind.key(i);
    const id = pk.keyId();
    const did = Crypto.Did.fromKeyId(id);
    console.log(`  - ${i}: ${did.toString()}`);
  }
};
