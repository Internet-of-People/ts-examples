import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { didTombstone } from "../samples/did-tombstone";

export class DidTombstoneAction extends CommandLineAction {
  private _vaultPath!: CommandLineStringParameter;
  private _gasPassphrase!: CommandLineStringParameter;
  private _didToTombstone!: CommandLineStringParameter;
  private _signerKeyId!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'did-tombstone',
      summary: 'Tombstones a DID.',
      documentation: 'Tombstones a DID.'
    });
  }

  protected onDefineParameters(): void {
    this._vaultPath = vaultPathParameter(this);
    this._gasPassphrase = gasPassphraseParameter(this);

    this._didToTombstone = this.defineStringParameter({
      parameterLongName: '--did',
      argumentName: 'DID',
      description: 'The DID you\'d like to tombstone',
      required: true,
    });

    this._signerKeyId = signerKeyIdParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending tombstone did transaction with the following parameters:');
    console.log(`Vault Path: ${this._vaultPath.value}`);
    console.log(`DID to tombstone: ${this._didToTombstone.value}`);
    console.log(`Signer KeyId: ${this._signerKeyId.value}`);

    await checkIfSenderHasEnoughHydras(this._gasPassphrase.value!);
    await didTombstone(
      this._vaultPath.value!,
      new Crypto.Did(this._didToTombstone.value!),
      Crypto.authenticationFromData(this._signerKeyId.value!),
      this._gasPassphrase.value!,
    );
  }
}