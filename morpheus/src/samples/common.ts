import { Crypto, Types } from "@internet-of-people/sdk";
import { rustNetworkFromNetwork } from '../utils';

export function getHydraPrivate(
  vault: Crypto.Vault,
  unlockPassword: string,
  network: string
  ): Crypto.HydraPrivate {
  const hydraNetwork = rustNetworkFromNetwork(network)
  const hydraParameters = new Crypto.HydraParameters(
    hydraNetwork,
    0
  );
  try {
    Crypto.HydraPlugin.init(vault, unlockPassword, hydraParameters);
  } catch (_) {
    /* No problem if it was already initialized */
  }

  const plugin = Crypto.HydraPlugin.get(vault, hydraParameters);
  return plugin.priv(unlockPassword)
}

export function getMorpheusPrivate(
  vault: Crypto.Vault,
  unlockPassword: string
): Crypto.MorpheusPrivate {
  try {
    Crypto.MorpheusPlugin.init(vault, unlockPassword);
  } catch (_) {
    /* No problem if it was already initialized */
  }

  const plugin = Crypto.MorpheusPlugin.get(vault);
  return plugin.priv(unlockPassword);
}

export function signMorpheusOperation(operation: Crypto.MorpheusSignableOperation, morpheusPrivate: Crypto.MorpheusPrivate, keyId: Types.Crypto.Authentication) {
  const morpheusSigner = new Crypto.MorpheusOperationSigner;
  morpheusSigner.add(operation);
  const privKey = morpheusPrivate.keyById(keyId).privateKey();
  return morpheusSigner.sign(privKey);
}

export function buildMorpheusAsset(signedOperation: Crypto.MorpheusSignedOperation) {
  const morpheusAssetBuilder = new Crypto.MorpheusAssetBuilder();
  morpheusAssetBuilder.addSigned(signedOperation);
  return morpheusAssetBuilder.build();
}