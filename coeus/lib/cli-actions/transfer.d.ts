import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class TransferAction extends CommandLineAction {
    private _domain;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
