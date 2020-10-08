import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { sendUpdate } from "../samples/update";
import { dataParameter, domainParameter } from "./common";

export class UpdateAction extends CommandLineAction {
  private _domain!: CommandLineStringParameter;
  private _data!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'update',
      summary: 'Updates the data of the given domain.',
      documentation: 'Updates the data of the given domain.'
    });
  }

  protected onDefineParameters(): void {
    this._domain = domainParameter(this);
    this._data = dataParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain update with the following parameters:');
    console.log(`Domain: ${this._domain.value}`);
    console.log(`Data: ${this._data.value}`);
    await sendUpdate(this._domain.value!, this._data.value!);
  }
}