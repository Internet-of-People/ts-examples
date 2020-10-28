import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class BeforeProofRegisterAction extends CommandLineAction {
    private contentId;
    private gasPassphrase;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
