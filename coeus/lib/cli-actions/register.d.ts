import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class RegisterAction extends CommandLineAction {
    private domain;
    private data;
    private expiresAtHeight;
    private registrationPolicy;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
