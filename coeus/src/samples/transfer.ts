import { Coeus, Crypto, Layer1 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork, rustNetworkFromNetwork } from '../utils';

const { DomainName, Principal, UserOperation } = Coeus;

export const sendTransfer = async (network: string, domain: string): Promise<void> => {
  const coin = rustNetworkFromNetwork(network);
  const networkConfig = networkConfigFromNetwork(network);

  const unlockPassword = 'unlock_password';
  const hydraParameters = new Crypto.HydraParameters(coin, 0);

  // ORIGINAL OWNER
  const phrase = 'include pear escape sail spy orange cute despair witness trouble sleep torch wire burst unable brass expose fiction drift clock duck oxygen aerobic already';
  const vault = Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);
  Crypto.HydraPlugin.init(vault, unlockPassword, hydraParameters);

  const hydra = Crypto.HydraPlugin.get(vault, hydraParameters);
  const hydraPrivate = hydra.priv(unlockPassword);

  const fromAddress = hydra.pub.key(0).address;

  // See delete.ts as this key is the key from the wallet created there.
  const newOwnerPubKey = 'pszkrWygFdYDVWr6L2G1Mt84RQVaJoy8ixcGhjCxqKqAoYn';
  const userOperation = UserOperation.transfer(
    new DomainName(domain),
    Principal.publicKey(new Coeus.PublicKey(newOwnerPubKey)),
  );

  console.log(`Gas address is ${fromAddress} and the new domain owner key is ${newOwnerPubKey}`);

  const api = await Layer1.createApi(networkConfig);
  const txId = await api.sendCoeusTx(fromAddress, [userOperation], hydraPrivate);

  console.log(`Transfer txn sent, id: ${txId}`);
};
