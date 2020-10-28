import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendDelete } from '../samples/delete';
import { domainParameter } from './common';

export class DeleteAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'delete',
      summary: 'Deletes a given domain.',
      documentation: 'Deletes a given domain.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain deletion with the following parameters:');
    console.log(`Domain: ${this.domain.value!}`);
    await sendDelete(this.domain.value!);
  }
}
