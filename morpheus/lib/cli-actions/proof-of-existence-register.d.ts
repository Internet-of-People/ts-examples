import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class BeforeProofRegisterAction extends CommandLineAction {
    private _contentId;
    private _gasPassphrase;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
