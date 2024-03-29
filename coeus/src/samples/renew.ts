import { Coeus, Crypto, Layer1 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork, rustNetworkFromNetwork } from '../utils';

const { DomainName, UserOperation } = Coeus;

export const sendRenew = async (
  network: string,
  domain: string,
  expiresAtHeight: number,
): Promise<void> => {
  const coin = rustNetworkFromNetwork(network);
  const networkConfig = networkConfigFromNetwork(network);

  const unlockPassword = 'unlock_password';
  const phrase = 'include pear escape sail spy orange cute despair witness trouble sleep torch wire burst unable brass expose fiction drift clock duck oxygen aerobic already';
  const vault = Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);

  const hydraParameters = new Crypto.HydraParameters(coin, 0);
  Crypto.HydraPlugin.init(vault, unlockPassword, hydraParameters);

  const hydra = Crypto.HydraPlugin.get(vault, hydraParameters);
  const hydraPrivate = hydra.priv(unlockPassword);

  const fromAddress = hydra.pub.key(0).address;
  const userOperation = UserOperation.renew(
    new DomainName(domain),
    expiresAtHeight,
  );

  console.log(`Gas address is ${fromAddress}`);

  const api = await Layer1.createApi(networkConfig);
  const txId = await api.sendCoeusTx(fromAddress, [userOperation], hydraPrivate);

  console.log(`Renew txn sent, id: ${txId}`);
};
