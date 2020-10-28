import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { vaultLoadAndDump } from '../samples/vault-dump';
import { vaultInit } from '../samples/vault-init';

export class VaultInitAction extends CommandLineAction {
  private at!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'vault-init',
      summary: 'Initializes a vault at the location you provide.',
      documentation: 'Initializes a vault at the location you provide.',
    });
  }

  protected onDefineParameters(): void {
    this.at = this.defineStringParameter({
      parameterLongName: '--at',
      argumentName: 'AT',
      description: 'The path where the vault is going to be saved.',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Initializing vault with the following parameters:');
    console.log(`At: ${this.at.value!}`);

    await vaultInit(this.at.value!);
    await vaultLoadAndDump(this.at.value!);
  }
}
