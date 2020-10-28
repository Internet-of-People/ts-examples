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

export const didTombstone = async(
  vaultPath: string,
  didToTombstone: Crypto.Did,
  signerKeyId: Types.Crypto.Authentication,
  gasPassphrase: string,
): Promise<void> => {
  const serializedVault = await fs.readFile(vaultPath, { encoding: 'utf-8' });
  const vault = Crypto.Vault.load(JSON.parse(serializedVault));
  const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);

  const networkConfig = NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703);
  const layer1Api = await Layer1.createApi(networkConfig);
  const layer2Api = Layer2.createMorpheusApi(networkConfig);

  const lastTxId = await layer2Api.getLastTxId(didToTombstone);
  const opAttempts = new Layer1.OperationAttemptsBuilder()
    .signWith(morpheusPlugin.priv(unlockPassword))
    .on(didToTombstone, lastTxId)
    .tombstoneDid()
    .sign(signerKeyId)
    .getAttempts();

  const id = await layer1Api.sendMorpheusTxWithPassphrase(opAttempts, gasPassphrase);
  console.log(`Add impersonate right txn was sent, id: ${id}`);
};
