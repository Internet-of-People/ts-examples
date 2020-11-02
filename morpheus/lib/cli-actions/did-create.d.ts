import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class DidCreateAction extends CommandLineAction {
    private vaultPath;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
