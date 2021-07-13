import {
  Crypto,
  Layer1,
  Layer2,
} from '@internet-of-people/sdk';
import { loadVaultFromFile, networkConfigFromNetwork } from '../utils';
import { buildMorpheusAsset, getHydraPrivate, getMorpheusPrivate, signMorpheusOperation } from './common';

export const didTombstone = async (
  network: string,
  vaultPath: string,
  didToTombstone: Crypto.Did,
  signerKeyId: Crypto.KeyId,
  unlockPassword: string,
): Promise<void> => {
  const vault = await loadVaultFromFile(vaultPath);
  
  const hydraPrivate = getHydraPrivate(vault, unlockPassword, network);
  const morpheusPrivate = getMorpheusPrivate(vault, unlockPassword);

  const networkConfig = networkConfigFromNetwork(network);
  const layer1Api = await Layer1.createApi(networkConfig);
  const layer2Api = Layer2.createMorpheusApi(networkConfig);

  const lastTxId = await layer2Api.getLastTxId(didToTombstone);
  const morpheusOperationBuilder = new Crypto.MorpheusOperationBuilder(
    didToTombstone.toString(),
    lastTxId
  );
  const signableOperation = morpheusOperationBuilder.tombstoneDid();
  const signedOperation = signMorpheusOperation(signableOperation, morpheusPrivate, signerKeyId);
  const assets = buildMorpheusAsset(signedOperation);

  const senderAddress = hydraPrivate.pub.key(0).address;
  const id = await layer1Api.sendMorpheusTx(senderAddress, assets, hydraPrivate);

  console.log(`DID tombstone txn was sent, id: ${id}`);
};
