import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class BeforeProofRegisterAction extends CommandLineAction {
    private contentId;
    private gasPassphrase;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
