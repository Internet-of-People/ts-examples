import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class KeyAddAction extends CommandLineAction {
    private _vaultPath;
    private _gasPassphrase;
    private _keyIdToAdd;
    private _didToAdd;
    private _signerKeyId;
    private _expiresAtHeight;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
