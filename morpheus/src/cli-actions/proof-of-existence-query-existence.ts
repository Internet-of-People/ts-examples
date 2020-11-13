import { CommandLineAction, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { queryBeforeProofExistence } from '../samples/proof-of-existence-query-existence';

export class BeforeProofQueryExistenceAction extends CommandLineAction {
  private contentId!: CommandLineStringParameter;
  private height!: CommandLineIntegerParameter;

  public constructor() {
    super({
      actionName: 'poe-query',
      summary: 'Queries if the given content id exists on the blockchain.',
      documentation: 'Queries if the given content id exists on the blockchain.',
    });
  }

  protected onDefineParameters(): void {
    this.contentId = this.defineStringParameter({
      parameterLongName: '--content-id',
      argumentName: 'CONTENT_ID',
      description: 'The content id you\'d like to query. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
      required: true,
    });

    this.height = this.defineIntegerParameter({
      parameterLongName: '--at-height',
      argumentName: 'AT_HEIGHT',
      description: 'Check existence at this height.',
      required: false,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Querying content id\'s existence:');
    console.log(`Content Id: ${this.contentId.value!}`);
    console.log(`At height: ${this.height.value ? this.height.value : '-'}`);
    await queryBeforeProofExistence(this.contentId.value!, this.height.value);
  }
}