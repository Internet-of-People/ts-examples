import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class RightRevokeAction extends CommandLineAction {
    private _vaultPath;
    private _gasPassphrase;
    private _keyIdToAdd;
    private _onDid;
    private _signerKeyId;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
