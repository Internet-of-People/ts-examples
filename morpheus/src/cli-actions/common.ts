import { Identities } from '@arkecosystem/crypto';
import { getHostByNetwork, Layer1, Network, NetworkConfig } from '@internet-of-people/sdk';
import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';

export const checkIfSenderHasEnoughHydras = async(passphrase: string): Promise<void> => {
  const api = await Layer1.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  const address = Identities.Address.fromPassphrase(passphrase);
  const balance = await api.getWalletBalance(address);

  if (balance < BigInt(1e8)) {
    throw new Error(`${address} does not have enough HYD to send a transaction. It has: ${balance} Flakes`);
  }
};

export const gasPassphraseParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--gas-passphrase',
    argumentName: 'GAS_PASSPHRASE',
    description: 'The wallet that pays for the blockchain transaction.',
    required: true,
  });
};

export const vaultPathParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--vault-path',
    argumentName: 'VAULT_PATH',
    description: 'The path where the vault is saved.',
    required: true,
  });
};

export const signerKeyIdParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--signer-keyid',
    argumentName: 'SIGNER_KEYID',
    description: 'The keyid that signs this morpheus operation.',
    required: true,
  });
};
