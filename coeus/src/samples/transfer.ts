import { Interfaces as ArkCryptoIf } from "@arkecosystem/crypto";
import { Coeus, Crypto, getHostByNetwork, Layer1, Layer2, Network, NetworkConfig } from '@internet-of-people/sdk';

const {
  CoeusTxBuilder,
  DomainName,
  HydraSigner,
  NoncedOperationsBuilder,
  Principal,
  PrivateKey,
  UserOperation,
} = Coeus;

export const sendTransfer = async (domain: string) => {
  const network = Crypto.Coin.Hydra.Testnet;
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

  // NEW OWNER
  const phraseNewOwner = 'thumb agent inform iron text define merry pair caution inquiry chair blood extend empower range alone antique casual jazz manage ostrich length arrange become';
  const vaultNewOwner = Crypto.Vault.create(phraseNewOwner, 'bip39_password', unlockPassword);
  Crypto.HydraPlugin.rewind(vaultNewOwner, unlockPassword, hydraParameters);

  const hydraNewOwner = Crypto.HydraPlugin.get(vaultNewOwner, hydraParameters);
  const hydraPrivateNewOwner = hydraNewOwner.priv(unlockPassword);
  const secpPrivateKeyNewOwner = hydraPrivateNewOwner.key(0).privateKey();
  const multicipherPrivateKeyNewOwner = PrivateKey.fromSecp(secpPrivateKeyNewOwner);
  const multicipherPublicKeyNewOwner = multicipherPrivateKeyNewOwner.publicKey();

  const networkConfig = NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703);
  const layer1Api = await Layer1.createApi(networkConfig);
  // address is tfGrjiGiL3Rs4etZw6SchqXt8JJ1VFzNHB
  const layer1Nonce = BigInt(await layer1Api.getWalletNonce(hydra.pub.key(0).address)) + BigInt(1);

  const layer2Api = Layer2.createCoeusApi(networkConfig);
  const layer2Nonce = BigInt(await layer2Api.getLastNonce(multicipherPublicKey)) + BigInt(1);

  const noncedOps = new NoncedOperationsBuilder()
    .add(UserOperation.transfer(
      new DomainName(domain),
      Principal.publicKey(multicipherPublicKeyNewOwner),
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