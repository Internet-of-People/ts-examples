import {
  Crypto,
  Layer1,
  Layer2,
  Types,
} from '@internet-of-people/sdk';
import { loadVaultFromFile, networkConfigFromNetwork } from '../utils';
import { buildMorpheusAsset, getHydraPrivate, getMorpheusPrivate, signMorpheusOperation } from './common';

export const rightRevoke = async (
  network: string,
  vaultPath: string,
  keyIdToRevoke: Types.Crypto.Authentication,
  didToEdit: Crypto.Did,
  signerKeyId: Types.Crypto.Authentication,
  right: string,
  unlockPassword: string,
): Promise<void> => {
  const vault = await loadVaultFromFile(vaultPath);
  
  const hydraPrivate = getHydraPrivate(vault, unlockPassword, network);
  const morpheusPrivate = getMorpheusPrivate(vault, unlockPassword);

  const networkConfig = networkConfigFromNetwork(network);
  const layer1Api = await Layer1.createApi(networkConfig);
  const layer2Api = Layer2.createMorpheusApi(networkConfig);

  const lastTxId = await layer2Api.getLastTxId(didToEdit);
  const morpheusOperationBuilder = new Crypto.MorpheusOperationBuilder(
    didToEdit.toString(),
    lastTxId
  );
  const signableOperation = morpheusOperationBuilder.revokeRight(keyIdToRevoke.toString(), right);
  const signedOperation = signMorpheusOperation(signableOperation, morpheusPrivate, signerKeyId);
  const assets = buildMorpheusAsset(signedOperation);

  const senderAddress = hydraPrivate.pub.key(0).address;
  const id = await layer1Api.sendMorpheusTx(senderAddress, assets, hydraPrivate);
  console.log(`Revoke right txn was sent, id: ${id}`);
};
