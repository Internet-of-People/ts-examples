import { Layer1 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork } from '../utils';

export const sendRegisterBeforeProof = async(
  network: string,
  contentId: string,
  passphrase: string,
): Promise<void> => {
  const opAttempts = new Layer1.OperationAttemptsBuilder()
    .registerBeforeProof(contentId)
    .getAttempts();

  const networkConfig = networkConfigFromNetwork(network);
  const api = await Layer1.createApi(networkConfig);
  const id = await api.sendMorpheusTxWithPassphrase(opAttempts, passphrase);
  console.log(`Proof of existence txn was sent, id: ${id}`);
};
