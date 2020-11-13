import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendRenew } from '../samples/renew';
import { domainParameter, expiresAtHeightParameter, networkParameter } from './common';

export class RenewAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private expiresAtHeight!: CommandLineIntegerParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'renew',
      summary: 'Renews the given domain.',
      documentation: 'Renews the given domain.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
    this.expiresAtHeight = expiresAtHeightParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain renewal with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Domain: ${this.domain.value!}`);
    console.log(`- Expires at Height: ${this.expiresAtHeight.value!}`);
    await sendRenew(this.network.value!, this.domain.value!, this.expiresAtHeight.value!);
  }
}
