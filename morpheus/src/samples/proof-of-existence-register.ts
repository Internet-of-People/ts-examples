import { getHostByNetwork, Layer1, Network, NetworkConfig } from '@internet-of-people/sdk';

export const sendRegisterBeforeProof = async(
  contentId: string,
  passphrase: string,
): Promise<void> => {
  const opAttempts = new Layer1.OperationAttemptsBuilder()
    .registerBeforeProof(contentId)
    .getAttempts();

  const api = await Layer1.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  const id = await api.sendMorpheusTxWithPassphrase(opAttempts, passphrase);
  console.log(`Proof of existence txn was sent, id: ${id}`);
};
