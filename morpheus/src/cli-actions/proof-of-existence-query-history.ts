import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { queryBeforeProofHistory } from '../samples/proof-of-existence-query-history';
import { contentIdParameter, networkParameter } from './common';

export class BeforeProofQueryHistoryAction extends CommandLineAction {
  private contentId!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'poe-query-history',
      summary: 'Queries the given content id\'s history.',
      documentation: 'Queries the given content id\'s history.',
    });
  }

  protected onDefineParameters(): void {
    this.contentId = contentIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Querying content id\'s existence:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Content Id: ${this.contentId.value!}`);
    await queryBeforeProofHistory(this.network.value!, this.contentId.value!);
  }
}
