import { Interfaces as ArkCryptoIf } from "@arkecosystem/crypto";
import { Coeus, Crypto, getHostByNetwork, Layer1, Network, NetworkConfig } from '@internet-of-people/sdk';

const {
  CoeusTxBuilder,
  DomainName,
  HydraSigner,
  NoncedOperationsBuilder,
  UserOperation,
  PrivateKey,
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

  // NEW OWNER
  const phraseNewOwner = 'thumb agent inform iron text define merry pair caution inquiry chair blood extend empower range alone antique casual jazz manage ostrich length arrange become';
  const vaultNewOwner = Crypto.Vault.create(phraseNewOwner, 'bip39_password', unlockPassword);
  Crypto.HydraPlugin.rewind(vaultNewOwner, unlockPassword, hydraParameters);

  const hydraNewOwner = Crypto.HydraPlugin.get(vaultNewOwner, hydraParameters);
  const hydraPrivateNewOwner = hydraNewOwner.priv(unlockPassword);
  const secpPrivateKeyNewOwner = hydraPrivateNewOwner.key(0).privateKey();
  const multicipherPrivateKeyNewOwner = PrivateKey.fromSecp(secpPrivateKeyNewOwner);
  const multicipherPublicKeyNewOwner = multicipherPrivateKeyNewOwner.publicKey();

  const layer1Api = await Layer1.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  // address is tfGrjiGiL3Rs4etZw6SchqXt8JJ1VFzNHB
  const currentNonce = await layer1Api.getWalletNonce(hydra.pub.key(0).address);

  const noncedOps = new NoncedOperationsBuilder()
    .add(UserOperation.transfer(
      new DomainName(domain),
      Principal.publicKey(multicipherPublicKeyNewOwner.toString()),
    ))
    .build(BigInt(4)); // TODO: coeus nonce
  const signedOps = noncedOps.sign(multicipherPrivateKey);
  
  const tx = new CoeusTxBuilder(network)
    .build(signedOps, secpPublicKey, BigInt(currentNonce) + BigInt(1));
  const signer = new HydraSigner(secpPrivateKey);
  const signedTx: ArkCryptoIf.ITransactionData = signer.signHydraTransaction(tx);

  const txId = await layer1Api.sendTx(signedTx);
  console.log(`Register tx sent. Tx ID: ${txId}`);
};