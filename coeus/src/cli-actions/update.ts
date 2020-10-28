import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendUpdate } from '../samples/update';
import { dataParameter, domainParameter } from './common';

export class UpdateAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private data!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'update',
      summary: 'Updates the data of the given domain.',
      documentation: 'Updates the data of the given domain.',
    });
  }

  protected onDefineParameters(): void {
    this.domain = domainParameter(this);
    this.data = dataParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain update with the following parameters:');
    console.log(`Domain: ${this.domain.value!}`);
    console.log(`Data: ${this.data.value!}`);
    await sendUpdate(this.domain.value!, this.data.value!);
  }
}
