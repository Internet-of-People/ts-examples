import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class DidTombstoneAction extends CommandLineAction {
    private _vaultPath;
    private _gasPassphrase;
    private _didToTombstone;
    private _signerKeyId;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
