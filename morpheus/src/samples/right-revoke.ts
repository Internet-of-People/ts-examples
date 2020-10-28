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

export const rightRevoke = async(
  vaultPath: string,
  keyIdToRevoke: Types.Crypto.Authentication,
  didToAdd: Crypto.Did,
  signerKeyId: Types.Crypto.Authentication,
  gasPassphrase: string,
): Promise<void> => {
  const serializedVault = await fs.readFile(vaultPath, { encoding: 'utf-8' });
  const vault = Crypto.Vault.load(JSON.parse(serializedVault));
  const morpheusPlugin = Crypto.MorpheusPlugin.get(vault);

  const networkConfig = NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703);
  const layer1Api = await Layer1.createApi(networkConfig);
  const layer2Api = Layer2.createMorpheusApi(networkConfig);

  const lastTxId = await layer2Api.getLastTxId(didToAdd);
  const opAttempts = new Layer1.OperationAttemptsBuilder()
    .signWith(morpheusPlugin.priv(unlockPassword))
    .on(didToAdd, lastTxId)
    .revokeRight(keyIdToRevoke, new Layer2.SystemRights().impersonate)
    .sign(signerKeyId)
    .getAttempts();

  const id = await layer1Api.sendMorpheusTxWithPassphrase(opAttempts, gasPassphrase);
  console.log(`Add impersonate right txn was sent, id: ${id}`);
};
