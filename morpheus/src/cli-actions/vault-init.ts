import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { vaultLoadAndDump } from "../samples/vault-dump";
import { vaultInit } from "../samples/vault-init";

export class VaultInitAction extends CommandLineAction {
  private _at!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'vault-init',
      summary: 'Initializes a vault at the location you provide.',
      documentation: 'Initializes a vault at the location you provide.'
    });
  }

  protected onDefineParameters(): void {
    this._at = this.defineStringParameter({
      parameterLongName: '--at',
      argumentName: 'AT',
      description: 'The path where the vault is going to be saved.',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Initializing vault with the following parameters:');
    console.log(`At: ${this._at.value}`);

    await vaultInit(this._at.value!);
    await vaultLoadAndDump(this._at.value!);
  }
}