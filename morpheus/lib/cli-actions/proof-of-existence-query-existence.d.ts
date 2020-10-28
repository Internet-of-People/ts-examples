import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class BeforeProofQueryExistenceAction extends CommandLineAction {
    private _contentId;
    private _height;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
