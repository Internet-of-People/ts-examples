import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { didCreate } from '../samples/did-create';
import { vaultLoadAndDump } from '../samples/vault-dump';
import { unlockPasswordParameter, vaultPathParameter } from './common';

export class DidCreateAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private unlockPassword!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'did-create',
      summary: 'Creates a DID using the vault at the given location.',
      documentation: 'Creates a DID using the vault at the given location.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.unlockPassword = unlockPasswordParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Creating a DID with the following parameters:');
    console.log(`Vault Path: ${this.vaultPath.value!}`);

    await didCreate(this.vaultPath.value!, this.unlockPassword.value!);
    await vaultLoadAndDump(this.vaultPath.value!);
  }
}
