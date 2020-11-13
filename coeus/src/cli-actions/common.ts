import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';

export const principalParameter = (ref: CommandLineAction, cliFlag: string): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: `--${cliFlag}`,
    argumentName: 'PRINCIPAL',
    description: 'The owner of the domain. Currently a pubkey.',
    required: true,
  });
};

export const domainParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--domain',
    argumentName: 'DOMAIN',
    description: 'The domain, e.g. .schema.iop',
    required: true,
  });
};

export const dataParameter = (ref: CommandLineAction): CommandLineStringParameter => {
  return ref.defineStringParameter({
    parameterLongName: '--data',
    argumentName: 'DATA',
    description: 'The data that satisfies the schema of the given domain\'s parent domain.',
    required: true,
  });
};

export const expiresAtHeightParameter = (ref: CommandLineAction): CommandLineIntegerParameter => {
  return ref.defineIntegerParameter({
    parameterLongName: '--expires-at-height',
    argumentName: 'EXPIRES_AT_HEIGHT',
    description: 'The blockheight when the given domain are going to be expired.',
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
