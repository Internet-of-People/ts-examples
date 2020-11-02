import { Interfaces as ArkCryptoIf } from '@arkecosystem/crypto';
import { Coeus, Crypto, getHostByNetwork, Layer1, Layer2, Network, NetworkConfig } from '@internet-of-people/sdk';

const {
  CoeusTxBuilder,
  DomainName,
  HydraSigner,
  NoncedBundleBuilder,
  UserOperation,
  PrivateKey,
} = Coeus;

export const sendDelete = async(
  domain: string,
): Promise<void> => {
  const network = Crypto.Coin.Hydra.Testnet;
  const unlockPassword = 'unlock_password';
  // Note: this mnemonic is the new owner's one who got the domain transferred in transfer.ts
  const phrase = 'thumb agent inform iron text define merry pair caution inquiry chair blood extend empower range alone antique casual jazz manage ostrich length arrange become';
  const vault = Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);

  const hydraParameters = new Crypto.HydraParameters(network, 0);
  Crypto.HydraPlugin.rewind(vault, unlockPassword, hydraParameters);

  const hydra = Crypto.HydraPlugin.get(vault, hydraParameters);
  const hydraPrivate = hydra.priv(unlockPassword);
  const secpPrivateKey = hydraPrivate.key(0).privateKey();
  const secpPublicKey = secpPrivateKey.publicKey();
  const multicipherPrivateKey = PrivateKey.fromSecp(secpPrivateKey);
  const multicipherPublicKey = multicipherPrivateKey.publicKey();

  const networkConfig = NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703);
  const layer1Api = await Layer1.createApi(networkConfig);
  // address is thPGZgTWACKgaPFFg7Ev59bUzoyeLehQqP
  const layer1Nonce = BigInt(await layer1Api.getWalletNonce(hydra.pub.key(0).address)) + BigInt(1);

  const layer2Api = Layer2.createCoeusApi(networkConfig);
  const layer2Nonce = BigInt(await layer2Api.getLastNonce(multicipherPublicKey)) + BigInt(1);

  const noncedOps = new NoncedBundleBuilder()
    .add(UserOperation.delete(
      new DomainName(domain),
    ))
    .build(layer2Nonce);
  const signedOps = noncedOps.sign(multicipherPrivateKey);

  const tx = new CoeusTxBuilder(network)
    .build(signedOps, secpPublicKey, layer1Nonce);
  const signer = new HydraSigner(secpPrivateKey);
  const signedTx: ArkCryptoIf.ITransactionData = signer.signHydraTransaction(tx);

  const txId = await layer1Api.sendTx(signedTx);
  console.log(`Register tx sent. Tx ID: ${txId}`);
};
