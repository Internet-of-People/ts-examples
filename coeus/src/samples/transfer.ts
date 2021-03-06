import { Interfaces as ArkCryptoIf } from '@arkecosystem/crypto';
import { Coeus, Crypto, Layer1, Layer2 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork, rustNetworkFromNetwork } from '../utils';

const {
  CoeusTxBuilder,
  DomainName,
  HydraSigner,
  NoncedBundleBuilder,
  Principal,
  PrivateKey,
  UserOperation,
} = Coeus;

export const sendTransfer = async(network: string, domain: string): Promise<void> => {
  const coin = rustNetworkFromNetwork(network);
  const networkConfig = networkConfigFromNetwork(network);
  const unlockPassword = 'unlock_password';
  const hydraParameters = new Crypto.HydraParameters(network, 0);

  // ORIGINAL OWNER
  const phrase = 'include pear escape sail spy orange cute despair witness trouble sleep torch wire burst unable brass expose fiction drift clock duck oxygen aerobic already';
  const vault = Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);
  Crypto.HydraPlugin.rewind(vault, unlockPassword, hydraParameters);

  const hydra = Crypto.HydraPlugin.get(vault, hydraParameters);
  const hydraPrivate = hydra.priv(unlockPassword);
  const secpPrivateKey = hydraPrivate.key(0).privateKey();
  const secpPublicKey = secpPrivateKey.publicKey();
  const multicipherPrivateKey = PrivateKey.fromSecp(secpPrivateKey);
  const multicipherPublicKey = multicipherPrivateKey.publicKey();

  // see the delete.ts as this key is the key from the wallet created there.
  const newPublicKey = 'pszkrWygFdYDVWr6L2G1Mt84RQVaJoy8ixcGhjCxqKqAoYn';

  const layer1Api = await Layer1.createApi(networkConfig);
  const layer1Nonce = BigInt(await layer1Api.getWalletNonce(hydra.pub.key(0).address)) + BigInt(1);

  const layer2Api = Layer2.createCoeusApi(networkConfig);
  const layer2Nonce = BigInt(await layer2Api.getLastNonce(multicipherPublicKey)) + BigInt(1);

  const noncedOps = new NoncedBundleBuilder()
    .add(UserOperation.transfer(
      new DomainName(domain),
      Principal.publicKey(new Coeus.PublicKey(newPublicKey)),
    ))
    .build(layer2Nonce);
  const signedOps = noncedOps.sign(multicipherPrivateKey);

  const tx = new CoeusTxBuilder(coin)
    .build(signedOps, secpPublicKey, layer1Nonce);
  const signer = new HydraSigner(secpPrivateKey);
  const signedTx: ArkCryptoIf.ITransactionData = signer.signHydraTransaction(tx);

  const txId = await layer1Api.sendTx(signedTx);
  console.log(`Register tx sent. Tx ID: ${txId}`);
};
