import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
export declare const checkIfSenderHasEnoughHydras: (network: string, passphrase: string) => Promise<void>;
export declare const gasPassphraseParameter: (ref: CommandLineAction) => CommandLineStringParameter;
export declare const vaultPathParameter: (ref: CommandLineAction) => CommandLineStringParameter;
export declare const signerKeyIdParameter: (ref: CommandLineAction) => CommandLineStringParameter;
export declare const networkParameter: (ref: CommandLineAction) => CommandLineChoiceParameter;
