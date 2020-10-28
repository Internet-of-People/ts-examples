import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class VaultDumpAction extends CommandLineAction {
    private _at;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
