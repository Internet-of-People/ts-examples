import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { sendRegister } from "../samples/register";
import { dataParameter, domainParameter, expiresAtHeightParameter } from "./common";

export class RegisterAction extends CommandLineAction {
  private _domain!: CommandLineStringParameter;
  private _data!: CommandLineStringParameter;
  private _expiresAtHeight!: CommandLineIntegerParameter;
  private _registrationPolicy!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'register',
      summary: 'Registers a domain with the given data.',
      documentation: 'Registers a domain with the given data.'
    });
  }

  protected onDefineParameters(): void {
    this._domain = domainParameter(this);
    this._data = dataParameter(this);
    this._expiresAtHeight = expiresAtHeightParameter(this);
    this._registrationPolicy = this.defineChoiceParameter({
      parameterLongName: '--registration-policy',
      alternatives: ['owner', 'any'],
      description: 'TODO',
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain registration with the following parameters:');
    console.log(`- Domain: ${this._domain.value}`);
    console.log(`- Registration Policy: ${this._registrationPolicy.value || 'Not specified'}`);
    console.log(`- Data: ${this._data.value}`);
    console.log(`- Expires at Height: ${this._expiresAtHeight.value}`);
    await sendRegister(
      this._domain.value!,
      this._data.value!,
      this._expiresAtHeight.value!,
    );
  }
}