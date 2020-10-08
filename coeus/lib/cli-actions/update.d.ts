import { CommandLineAction } from "@rushstack/ts-command-line";
export declare class UpdateAction extends CommandLineAction {
    private _domain;
    private _data;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
