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

export const sendUpdate = async (
  domain: string,
  data: string,
) => {
  const network = Crypto.Coin.Hydra.Testnet;
  const unlockPassword = 'unlock_password';
  const phrase = 'include pear escape sail spy orange cute despair witness trouble sleep torch wire burst unable brass expose fiction drift clock duck oxygen aerobic already';
  const vault = Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);
  
  const hydraParameters = new Crypto.HydraParameters(network, 0);
  Crypto.HydraPlugin.rewind(vault, unlockPassword, hydraParameters);

  const hydra = Crypto.HydraPlugin.get(vault, hydraParameters);
  const hydraPrivate = hydra.priv(unlockPassword);
  const secpPrivateKey = hydraPrivate.key(0).privateKey();
  const secpPublicKey = secpPrivateKey.publicKey();
  const multicipherPrivateKey = PrivateKey.fromSecp(secpPrivateKey);

  const layer1Api = await Layer1.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  // address is tfGrjiGiL3Rs4etZw6SchqXt8JJ1VFzNHB
  const currentNonce = await layer1Api.getWalletNonce(hydra.pub.key(0).address);

  const noncedOps = new NoncedOperationsBuilder()
    .add(UserOperation.update(
      new DomainName(domain),
      JSON.parse(data),
    ))
    .build(BigInt(3)); // TODO: coeus nonce
  const signedOps = noncedOps.sign(multicipherPrivateKey);
  
  const tx = new CoeusTxBuilder(network)
    .build(signedOps, secpPublicKey, BigInt(currentNonce) + BigInt(1));
  const signer = new HydraSigner(secpPrivateKey);
  const signedTx: ArkCryptoIf.ITransactionData = signer.signHydraTransaction(tx);

  const txId = await layer1Api.sendTx(signedTx);
  console.log(`Update tx sent. Tx ID: ${txId}`);
};