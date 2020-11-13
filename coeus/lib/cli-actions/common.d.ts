import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
export declare const principalParameter: (ref: CommandLineAction, cliFlag: string) => CommandLineStringParameter;
export declare const domainParameter: (ref: CommandLineAction) => CommandLineStringParameter;
export declare const dataParameter: (ref: CommandLineAction) => CommandLineStringParameter;
export declare const expiresAtHeightParameter: (ref: CommandLineAction) => CommandLineIntegerParameter;
export declare const networkParameter: (ref: CommandLineAction) => CommandLineChoiceParameter;
