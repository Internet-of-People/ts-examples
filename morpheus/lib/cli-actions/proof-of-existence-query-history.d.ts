import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class BeforeProofQueryHistoryAction extends CommandLineAction {
    private contentId;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
