import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { vaultLoadAndDump } from '../samples/vault-dump';

export class VaultDumpAction extends CommandLineAction {
  private at!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'vault-dump',
      summary: 'Dumps a vault at the location you provide.',
      documentation: 'Dumps a vault at the location you provide.',
    });
  }

  protected onDefineParameters(): void {
    this.at = this.defineStringParameter({
      parameterLongName: '--at',
      argumentName: 'AT',
      description: 'The path where the vault is saved.',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Dumping vault with the following parameters:');
    console.log(`At: ${this.at.value!}`);

    await vaultLoadAndDump(this.at.value!);
  }
}
