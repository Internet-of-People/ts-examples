import { Crypto } from '@internet-of-people/sdk';
import { loadVaultFromFile } from '../utils';

export const vaultLoadAndDump = async(path: string): Promise<void> => {
  console.log('### Vault Dump ###');
  console.log(`- Path: ${path}`);
  const vault = await loadVaultFromFile(path);

  let personas: Crypto.MorpheusPublicKind;
  try {
    const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);
    personas = morpheusPlugin.pub.personas;
  } catch (e) {
    throw new Error(e);
  }
  console.log('- Key Ids:');

  for (let i = 0; i < personas.count; ++i) {
    const pk = personas.key(i);
    const id = pk.keyId();
    console.log(`  - ${i}: ${id.toString()}`);
  }

  console.log('- DIDs:');

  for (let i = 0; i < personas.count; ++i) {
    const pk = personas.key(i);
    const id = pk.keyId();
    const did = Crypto.Did.fromKeyId(id);
    console.log(`  - ${i}: ${did.toString()}`);
  }
};
