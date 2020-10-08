import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class RenewAction extends CommandLineAction {
    private _domain;
    private _expiresAtHeight;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
