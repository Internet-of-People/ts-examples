import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class KeyRevokeAction extends CommandLineAction {
    private vaultPath;
    private gasPassphrase;
    private keyIdToRevoke;
    private didFromRevoke;
    private signerKeyId;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
