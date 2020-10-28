import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class DidCreateAction extends CommandLineAction {
    private _vaultPath;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
