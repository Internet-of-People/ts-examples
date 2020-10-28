import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { didCreate } from "../samples/did-create";
import { vaultLoadAndDump } from "../samples/vault-dump";
import { vaultPathParameter } from "./common";

export class DidCreateAction extends CommandLineAction {
  private _vaultPath!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'did-create',
      summary: 'Creates a DID using the vault at the given location.',
      documentation: 'Creates a DID using the vault at the given location.'
    });
  }

  protected onDefineParameters(): void {
    this._vaultPath = vaultPathParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Creating a DID with the following parameters:');
    console.log(`Vault Path: ${this._vaultPath.value}`);

    await didCreate(this._vaultPath.value!);
    await vaultLoadAndDump(this._vaultPath.value!);
  }
}