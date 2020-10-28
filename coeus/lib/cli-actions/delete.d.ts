import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class DeleteAction extends CommandLineAction {
    private domain;
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
