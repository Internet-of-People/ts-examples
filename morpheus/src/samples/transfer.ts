import { Layer1 } from '@internet-of-people/sdk';
import { getHydraPrivate } from './common';
import { loadVaultFromFile, networkConfigFromNetwork } from '../utils';


export const sendTransfer = async (
  vaultPath: string,
  network: string,
  unlockPassword: string,
  toAddress: string,
  amountHyd: BigInt,
): Promise<void> => {
  const vault = await loadVaultFromFile(vaultPath);
  const hydraPrivate = getHydraPrivate(vault, unlockPassword, network);

  const networkConfig = networkConfigFromNetwork(network);
  const api = await Layer1.createApi(networkConfig);

  const senderAddress = hydraPrivate.pub.key(0).address;
  const id = await api.sendTransferTx(
    senderAddress,
    toAddress,
    amountHyd.valueOf() * BigInt(1e8),
    hydraPrivate
  );

  console.log(`Transfer txn was sent, id: ${id}`);
};
