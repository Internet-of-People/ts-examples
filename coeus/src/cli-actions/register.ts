import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineIntegerParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import { sendRegister } from '../samples/register';
import { dataParameter, domainParameter, expiresAtHeightParameter, networkParameter } from './common';

export class RegisterAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private data!: CommandLineStringParameter;
  private expiresAtHeight!: CommandLineIntegerParameter;
  private registrationPolicy!: CommandLineChoiceParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'register',
      summary: 'Registers a domain with the given data.',
      documentation: 'Registers a domain with the given data.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
    this.data = dataParameter(this);
    this.expiresAtHeight = expiresAtHeightParameter(this);
    this.registrationPolicy = this.defineChoiceParameter({
      parameterLongName: '--registration-policy',
      alternatives: [ 'owner', 'any' ],
      description: 'TODO',
    });
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain registration with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Domain: ${this.domain.value!}`);
    console.log(`- Registration Policy: ${this.registrationPolicy.value || 'Not specified'}`);
    console.log(`- Data: ${this.data.value!}`);
    console.log(`- Expires at Height: ${this.expiresAtHeight.value!}`);
    await sendRegister(
      this.network.value!,
      this.domain.value!,
      this.data.value!,
      this.expiresAtHeight.value!,
    );
  }
}
