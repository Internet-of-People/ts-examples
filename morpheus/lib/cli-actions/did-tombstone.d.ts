import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class DidTombstoneAction extends CommandLineAction {
    private vaultPath;
    private gasPassphrase;
    private didToTombstone;
    private signerKeyId;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
