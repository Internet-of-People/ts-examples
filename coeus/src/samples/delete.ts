import { Coeus, Crypto, Layer1 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork, rustNetworkFromNetwork } from '../utils';

const { DomainName, UserOperation } = Coeus;

export const sendDelete = async (
  network: string,
  domain: string,
): Promise<void> => {
  const coin = rustNetworkFromNetwork(network);
  const networkConfig = networkConfigFromNetwork(network);
  const unlockPassword = 'unlock_password';
  // Note: this mnemonic is the new owner's one who got the domain transferred in transfer.ts
  const phrase = 'thumb agent inform iron text define merry pair caution inquiry chair blood extend empower range alone antique casual jazz manage ostrich length arrange become';
  const vault = Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);

  const hydraParameters = new Crypto.HydraParameters(coin, 0);
  Crypto.HydraPlugin.init(vault, unlockPassword, hydraParameters);

  const hydra = Crypto.HydraPlugin.get(vault, hydraParameters);
  const hydraPrivate = hydra.priv(unlockPassword);

  const fromAddress = hydra.pub.key(0).address;
  const userOperation = UserOperation.delete(new DomainName(domain));

  console.log(`Gas address is ${fromAddress}`);

  const api = await Layer1.createApi(networkConfig);
  const txId = await api.sendCoeusTx(fromAddress, [userOperation], hydraPrivate);

  console.log(`Delete txn sent, id: ${txId}`);
};
