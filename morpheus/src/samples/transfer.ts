import { getHostByNetwork, Layer1, Network, NetworkConfig } from '@internet-of-people/sdk';

export const sendTransfer = async(
  senderPassphrase: string,
  toAddress: string,
  amountHyd: BigInt,
): Promise<void> => {
  const api = await Layer1.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));

  const id = await api.sendTransferTxWithPassphrase(
    senderPassphrase,
    toAddress,
    BigInt(amountHyd) * BigInt(1e8),
  );

  console.log(`transfer txn was sent, id: ${id}`);
};
