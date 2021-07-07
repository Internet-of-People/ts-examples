import { Layer1 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork } from '../utils';

export const sendTransfer = async (
  network: string,
  senderPassphrase: string,
  toAddress: string,
  amountHyd: BigInt,
): Promise<void> => {
  const networkConfig = networkConfigFromNetwork(network);
  const api = await Layer1.createApi(networkConfig);

  const id = await api.sendTransferTxWithPassphrase(
    senderPassphrase,
    toAddress,
    amountHyd.valueOf() * BigInt(1e8),
  );

  console.log(`Transfer txn was sent, id: ${id}`);
};
