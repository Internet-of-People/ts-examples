import { Identities } from '@arkecosystem/crypto';
import { Layer1 } from '@internet-of-people/sdk';
import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { networkConfigFromNetwork } from '../utils';

export const checkIfSenderHasEnoughHydras = async(network: string, passphrase: string): Promise<void> => {
  const networkConfig = networkConfigFromNetwork(network);
  const api = await Layer1.createApi(networkConfig);
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

export const networkParameter = (ref: CommandLineAction): CommandLineChoiceParameter => {
  return ref.defineChoiceParameter({
    parameterLongName: '--network',
    alternatives: [ 'local-testnet', 'testnet', 'devnet', 'mainnet' ],
    description: 'The network you would like to run against the script.',
    required: false,
    defaultValue: 'local-testnet'
  });
};
