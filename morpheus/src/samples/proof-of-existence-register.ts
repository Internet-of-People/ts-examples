import {
  Crypto,
  Layer1,
} from '@internet-of-people/sdk';
import { loadVaultFromFile, networkConfigFromNetwork } from '../utils';
import { getHydraPrivate } from './common';

export const sendRegisterBeforeProof = async(
  network: string,
  vaultPath: string,
  contentId: string,
  unlockPassword: string,
): Promise<void> => {
  const vault = await loadVaultFromFile(vaultPath);
  const hydraPrivate = getHydraPrivate(vault, unlockPassword, network);
  
  const networkConfig = networkConfigFromNetwork(network);
  const layer1Api = await Layer1.createApi(networkConfig);

  const morpheusAssetBuilder = new Crypto.MorpheusAssetBuilder();
  morpheusAssetBuilder.addRegisterBeforeProof(contentId);
  const asset = morpheusAssetBuilder.build();

  const senderAddress = hydraPrivate.pub.key(0).address;
  console.log("sender:",senderAddress);
  const id = await layer1Api.sendMorpheusTx(senderAddress, asset, hydraPrivate);
  console.log(`Proof of existence txn was sent, id: ${id}`);
};
