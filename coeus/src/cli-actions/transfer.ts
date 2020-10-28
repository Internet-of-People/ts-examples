import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendTransfer } from '../samples/transfer';
import { domainParameter } from './common';

export class TransferAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'transfer',
      summary: 'Transfers the given domain to the given principal.',
      documentation: 'Transfers the given domain to the given principal.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain transfer with the following parameters:');
    console.log(`Domain: ${this.domain.value!}`);
    await sendTransfer(this.domain.value!);
  }
}
