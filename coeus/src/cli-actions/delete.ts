import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendDelete } from '../samples/delete';
import { domainParameter, networkParameter } from './common';

export class DeleteAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'delete',
      summary: 'Deletes a given domain.',
      documentation: 'Deletes a given domain.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain deletion with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Domain: ${this.domain.value!}`);
    await sendDelete(this.network.value!, this.domain.value!);
  }
}
