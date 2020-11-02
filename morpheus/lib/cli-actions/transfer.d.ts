import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class TransferAction extends CommandLineAction {
    private fromPassphrase;
    private toAddress;
    private amount;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
