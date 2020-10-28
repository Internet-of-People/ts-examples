import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { queryBeforeProofHistory } from '../samples/proof-of-existence-query-history';

export class BeforeProofQueryHistoryAction extends CommandLineAction {
  private _contentId!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'poe-query-history',
      summary: 'Queries the given content id\'s history.',
      documentation: 'Queries the given content id\'s history.'
    });
  }

  protected onDefineParameters(): void {
    this._contentId = this.defineStringParameter({
      parameterLongName: '--content-id',
      argumentName: 'CONTENT_ID',
      description: 'The content id you\'d like to query. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Querying content id\'s existence:');
    console.log(`Content Id: ${this._contentId.value}`);
    await queryBeforeProofHistory(this._contentId.value!);
  }
}