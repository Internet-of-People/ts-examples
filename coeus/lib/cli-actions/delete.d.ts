import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class DeleteAction extends CommandLineAction {
    private domain;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
