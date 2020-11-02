import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class KeyAddAction extends CommandLineAction {
    private vaultPath;
    private gasPassphrase;
    private keyIdToAdd;
    private didToAdd;
    private signerKeyId;
    private expiresAtHeight;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
