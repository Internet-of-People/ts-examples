import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class UpdateAction extends CommandLineAction {
    private domain;
    private data;
    private network;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
