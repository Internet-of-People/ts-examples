import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendTransfer } from '../samples/transfer';
import { domainParameter, networkParameter } from './common';

export class TransferAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'transfer',
      summary: 'Transfers the given domain to the given principal.',
      documentation: 'Transfers the given domain to the given principal.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain transfer with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Domain: ${this.domain.value!}`);
    await sendTransfer(this.network.value!, this.domain.value!);
  }
}
