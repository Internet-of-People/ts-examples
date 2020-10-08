import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class RegisterAction extends CommandLineAction {
    private _domain;
    private _data;
    private _expiresAtHeight;
    private _registrationPolicy;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
