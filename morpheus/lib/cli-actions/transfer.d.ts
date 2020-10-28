import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class TransferAction extends CommandLineAction {
    private _fromPassphrase;
    private _toAddress;
    private _amount;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
