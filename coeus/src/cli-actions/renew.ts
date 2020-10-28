import { CommandLineAction, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendRenew } from '../samples/renew';
import { domainParameter, expiresAtHeightParameter } from './common';

export class RenewAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private expiresAtHeight!: CommandLineIntegerParameter;

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
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain renewal with the following parameters:');
    console.log(`Domain: ${this.domain.value!}`);
    console.log(`Expires at Height: ${this.expiresAtHeight.value!}`);
    await sendRenew(this.domain.value!, this.expiresAtHeight.value!);
  }
}
