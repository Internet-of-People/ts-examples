import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { vaultLoadAndDump } from '../samples/vault-dump';
import { vaultPathParameter } from './common';

export class VaultDumpAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'vault-dump',
      summary: 'Dumps a vault at the location you provide.',
      documentation: 'Dumps a vault at the location you provide.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Dumping vault with the following parameters:');
    console.log(`At: ${this.vaultPath.value!}`);

    await vaultLoadAndDump(this.vaultPath.value!);
  }
}
