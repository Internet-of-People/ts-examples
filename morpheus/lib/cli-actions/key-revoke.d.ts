import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class KeyRevokeAction extends CommandLineAction {
    private _vaultPath;
    private _gasPassphrase;
    private _keyIdToRevoke;
    private _didFromRevoke;
    private _signerKeyId;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
