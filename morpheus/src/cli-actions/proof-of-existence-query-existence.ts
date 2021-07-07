import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { queryBeforeProofExistence } from '../samples/proof-of-existence-query-existence';
import { contentIdParameter, networkParameter } from './common';

export class BeforeProofQueryExistenceAction extends CommandLineAction {
  private contentId!: CommandLineStringParameter;
  private height!: CommandLineIntegerParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'poe-query',
      summary: 'Queries if the given content id exists on the blockchain.',
      documentation: 'Queries if the given content id exists on the blockchain.',
    });
  }

  protected onDefineParameters(): void {
    this.contentId = contentIdParameter(this);

    this.height = this.defineIntegerParameter({
      parameterLongName: '--at-height',
      argumentName: 'AT_HEIGHT',
      description: 'Check existence at this height.',
      required: false,
    });
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Querying content id\'s existence:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Content Id: ${this.contentId.value!}`);
    console.log(`- At height: ${this.height.value ? this.height.value : '-'}`);
    await queryBeforeProofExistence(this.network.value!, this.contentId.value!, this.height.value);
  }
}
