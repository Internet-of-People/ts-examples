import { CommandLineAction, CommandLineIntegerParameter, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { sendRenew } from "../samples/renew";
import { domainParameter, expiresAtHeightParameter } from "./common";

export class RenewAction extends CommandLineAction {
  private _domain!: CommandLineStringParameter;
  private _expiresAtHeight!: CommandLineIntegerParameter;

  public constructor() {
    super({
      actionName: 'renew',
      summary: 'Renews the given domain.',
      documentation: 'Renews the given domain.'
    });
  }

  protected onDefineParameters(): void {
    this._domain = domainParameter(this);
    this._expiresAtHeight = expiresAtHeightParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain renewal with the following parameters:');
    console.log(`Domain: ${this._domain.value}`);
    console.log(`Expires at Height: ${this._expiresAtHeight.value}`);
    await sendRenew(this._domain.value!, this._expiresAtHeight.value!);
  }
}