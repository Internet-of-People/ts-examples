import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { vaultLoadAndDump } from '../samples/vault-dump';
import { vaultInit } from '../samples/vault-init';
import { vaultPathParameter } from './common';

export class VaultInitAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'vault-init',
      summary: 'Initializes a vault at the location you provide.',
      documentation: 'Initializes a vault at the location you provide.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Initializing vault with the following parameters:');
    console.log(`At: ${this.vaultPath.value!}`);

    await vaultInit(this.vaultPath.value!);
    await vaultLoadAndDump(this.vaultPath.value!);
  }
}
