import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { vaultLoadAndDump } from '../samples/vault-dump';
import { vaultInit } from '../samples/vault-init';
import { networkParameter, unlockPasswordParameter, vaultPathParameter } from './common';

export class VaultInitAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private unlockPassword!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'vault-init',
      summary: 'Initializes a vault at the location you provide.',
      documentation: 'Initializes a vault at the location you provide.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.unlockPassword = unlockPasswordParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Initializing vault with the following parameters:');
    console.log(`At: ${this.vaultPath.value!}`);

    const mnemonic = await vaultInit(this.vaultPath.value!, this.unlockPassword.value!, this.network.value!);
    console.log('Mnemonic:', mnemonic);
    await vaultLoadAndDump(this.vaultPath.value!);
  }
}
