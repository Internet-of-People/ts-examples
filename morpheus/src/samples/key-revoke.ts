import {
  Crypto,
  Layer1,
  Layer2,
  Types,
} from '@internet-of-people/sdk';
import { loadVaultFromFile, networkConfigFromNetwork } from '../utils';
import { buildMorpheusAsset, getHydraPrivate, getMorpheusPrivate, signMorpheusOperation } from './common';

export const keyRevoke = async(
  network: string,
  vaultPath: string,
  keyIdToRevoke: Types.Crypto.Authentication,
  didFromRevoke: Crypto.Did,
  signerKeyId: Types.Crypto.Authentication,
  unlockPassword: string,
): Promise<void> => {
  const vault = await loadVaultFromFile(vaultPath);
  const hydraPrivate = getHydraPrivate(vault, unlockPassword, network);
  const morpheusPrivate = getMorpheusPrivate(vault, unlockPassword);

  const networkConfig = networkConfigFromNetwork(network);
  const layer1Api = await Layer1.createApi(networkConfig);
  const layer2Api = Layer2.createMorpheusApi(networkConfig);

  const lastTxId = await layer2Api.getLastTxId(didFromRevoke);
  const morpheusOperationBuilder = new Crypto.MorpheusOperationBuilder(
    didFromRevoke.toString(),
    lastTxId
  );
  const signableOperation = morpheusOperationBuilder.revokeKey(keyIdToRevoke.toString());
  const signedOperation = signMorpheusOperation(signableOperation, morpheusPrivate, signerKeyId);
  const assets = buildMorpheusAsset(signedOperation);

  const senderAddress = hydraPrivate.pub.key(0).address;
  const id = await layer1Api.sendMorpheusTx(senderAddress, assets, hydraPrivate);
  console.log(`Revoke key txn was sent, id: ${id}`);
};
