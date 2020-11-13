import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendUpdate } from '../samples/update';
import { dataParameter, domainParameter, networkParameter } from './common';

export class UpdateAction extends CommandLineAction {
  private domain!: CommandLineStringParameter;
  private data!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

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
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending domain update with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Domain: ${this.domain.value!}`);
    console.log(`- Data: ${this.data.value!}`);
    await sendUpdate(this.network.value!, this.domain.value!, this.data.value!);
  }
}
