import { promises as fs } from 'fs';
import {
  Crypto,
  getHostByNetwork,
  Layer1,
  Layer2,
  Network,
  NetworkConfig,
  Types,
} from '@internet-of-people/sdk';

const unlockPassword = 'correct horse battery staple';

export const keyRevoke = async (
  vaultPath: string,
  keyIdToRevoke: Types.Crypto.Authentication,
  didFromRevoke: Crypto.Did,
  signerKeyId: Types.Crypto.Authentication,
  gasPassphrase: string,
) => {
  const serializedVault = await fs.readFile(vaultPath, { encoding: 'utf-8' });
  const vault = Crypto.Vault.load(JSON.parse(serializedVault));
  const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);

  const networkConfig = NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703);
  const layer1Api = await Layer1.createApi(networkConfig);
  const layer2Api = Layer2.createApi(networkConfig);

  const lastTxId = await layer2Api.getLastTxId(didFromRevoke);
  const opAttempts = new Layer1.OperationAttemptsBuilder()
    .signWith(morpheusPlugin.priv(unlockPassword))
    .on(didFromRevoke, lastTxId)
    .revokeKey(keyIdToRevoke)
    .sign(signerKeyId)
    .getAttempts();

  const id = await layer1Api.sendMorpheusTxWithPassphrase(opAttempts, gasPassphrase);
  console.log(`Revoke key txn was sent, id: ${id}`);
};