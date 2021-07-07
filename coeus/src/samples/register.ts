import { Coeus, Crypto, Layer1 } from '@internet-of-people/sdk';
import { rustNetworkFromNetwork, networkConfigFromNetwork } from '../utils';

const {
  DomainName,
  UserOperation,
  Principal,
  SubtreePolicies,
} = Coeus;

export const sendRegister = async (
  network: string,
  domain: string,
  data: string,
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
  const hydraPubKey = hydra.pub.key(0);

  const fromAddress = hydraPubKey.address;
  const fromPubKey = Crypto.PublicKey.fromSecp(hydraPubKey.publicKey());

  const userOperation = UserOperation.register(
    new DomainName(domain),
    Principal.publicKey(fromPubKey),
    new SubtreePolicies(),
    JSON.parse(data),
    expiresAtHeight,
  );

  console.log(`Gas address is ${fromAddress} and the domain owner key is ${fromPubKey}`);

  const api = await Layer1.createApi(networkConfig);
  const txId = await api.sendCoeusTx(
    fromAddress,
    [userOperation],
    hydraPrivate,
  );

  console.log(`Register txn sent, id: ${txId}`);
};
