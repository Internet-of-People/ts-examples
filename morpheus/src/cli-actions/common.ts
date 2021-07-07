import { Identities } from '@arkecosystem/crypto';
// import { Crypto, Layer1 } from '@internet-of-people/sdk';
import { Layer1 } from '@internet-of-people/sdk';
import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
// import { networkConfigFromNetwork, rustNetworkFromNetwork } from '../utils';
import { networkConfigFromNetwork } from '../utils';

export const checkIfSenderHasEnoughHydras = async (network: string, passphrase: string): Promise<void> => {
  const networkConfig = networkConfigFromNetwork(network);
  // const rustNetwork = rustNetworkFromNetwork(network);
  const api = await Layer1.createApi(networkConfig);
  // const sk = Crypto.SecpPrivateKey.fromArkPassphrase(passphrase);
  // const address = sk.publicKey().arkKeyId().toAddress(rustNetwork);
  const address = Identities.Address.fromPassphrase(passphrase);
  const balance = await api.getWalletBalance(address);

  if (balance < BigInt(1e8)) {
    throw new Error(`${address} does not have enough HYD to send a transaction. It has: ${balance} Flakes`);
  }
};

export const gasPassphraseParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--gas-passphrase',
    parameterShortName: '-g',
    argumentName: 'GAS_PASSPHRASE',
    description: 'The wallet that pays for the blockchain transaction.',
    required: true,
  });
};

export const vaultPathParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--vault-path',
    parameterShortName: '-v',
    argumentName: 'VAULT_PATH',
    description: 'The path where the vault is saved.',
    required: true,
  });
};

export const signerKeyIdParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--signer-keyid',
    parameterShortName: '-s',
    argumentName: 'SIGNER_KEYID',
    description: 'The keyid that signs this morpheus operation.',
    required: true,
  });
};

export const networkParameter = (ref: CommandLineAction): CommandLineChoiceParameter => {
  return ref.defineChoiceParameter({
    parameterLongName: '--network',
    parameterShortName: '-n',
    alternatives: ['local-testnet', 'testnet', 'devnet', 'mainnet'],
    description: 'The network you would like to run against the script.',
    required: false,
    defaultValue: 'local-testnet',
  });
};

export const authParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--keyid',
    parameterShortName: '-i',
    argumentName: 'KEYID',
    description: 'The keyid (or public key) you\'d like to act on this DID.',
    required: true,
  });
};

export const didParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--did',
    parameterShortName: '-d',
    argumentName: 'DID',
    description: 'The DID which you want to act on.',
    required: true,
  });
};

export const rightParameter = (ref: CommandLineAction): CommandLineChoiceParameter => {
  return ref.defineChoiceParameter({
    parameterLongName: '--right',
    parameterShortName: '-r',
    alternatives: ['update', 'impersonate'],
    description: 'The right you would like to add to/revoke from the given key.',
    required: true,
  });
};

export const contentIdParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--content-id',
    parameterShortName: '-c',
    argumentName: 'CONTENT_ID',
    description: 'The content id you\'d like to act on. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
    required: true,
  });
};
