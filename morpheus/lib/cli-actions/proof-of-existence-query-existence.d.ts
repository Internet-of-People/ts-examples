import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class BeforeProofQueryExistenceAction extends CommandLineAction {
    private contentId;
    private height;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
