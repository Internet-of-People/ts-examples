import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class RenewAction extends CommandLineAction {
    private domain;
    private expiresAtHeight;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
