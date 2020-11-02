import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class RightAddAction extends CommandLineAction {
    private vaultPath;
    private gasPassphrase;
    private keyIdToAdd;
    private onDid;
    private signerKeyId;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
