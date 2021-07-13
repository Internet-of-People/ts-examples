import { Crypto, Layer1 } from '@internet-of-people/sdk';
import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { loadVaultFromFile, networkConfigFromNetwork, rustNetworkFromNetwork } from '../utils';

export const checkIfSenderHasEnoughHydras = async (network: string, vaultPath: string): Promise<void> => {
  const networkConfig = networkConfigFromNetwork(network);
  const rustNetwork = rustNetworkFromNetwork(network);

  const vault = await loadVaultFromFile(vaultPath);
  const hydraParameters = new Crypto.HydraParameters(rustNetwork, 0);
  const hydraPublic = Crypto.HydraPlugin.get(vault, hydraParameters);
  const senderAddress = hydraPublic.pub.key(0).address;

  const api = await Layer1.createApi(networkConfig);
  const balance = await api.getWalletBalance(senderAddress);

  if (balance < BigInt(1e8)) {
    throw new Error(`${senderAddress} does not have enough HYD to send a transaction. It has: ${balance} Flakes`);
  }
};

export const unlockPasswordParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--unlock-password',
    parameterShortName: '-p',
    argumentName: 'UNLOCK_PASSWORD',
    description: 'The password that unlocks the vault for signing and sending the morpheus transaction',
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
    defaultValue: 'testnet',
  });
};

export const authParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--keyid',
    parameterShortName: '-i',
    argumentName: 'KEYID',
    description: 'The keyid (or public key) with which you\'d like to act on a DID.',
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
