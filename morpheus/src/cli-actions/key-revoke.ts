import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { keyRevoke } from "../samples/key-revoke";

export class KeyRevokeAction extends CommandLineAction {
  private _vaultPath!: CommandLineStringParameter;
  private _gasPassphrase!: CommandLineStringParameter;
  private _keyIdToRevoke!: CommandLineStringParameter;
  private _didFromRevoke!: CommandLineStringParameter;
  private _signerKeyId!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'key-revoke',
      summary: 'Revokes a key from a DID.',
      documentation: 'Revokes a key from a DID.'
    });
  }

  protected onDefineParameters(): void {
    this._vaultPath = vaultPathParameter(this);
    this._gasPassphrase = gasPassphraseParameter(this);

    this._keyIdToRevoke = this.defineStringParameter({
      parameterLongName: '--keyid',
      argumentName: 'KEYID',
      description: 'The keyid you\'d like to remove from the did.',
      required: true,
    });

    this._didFromRevoke = this.defineStringParameter({
      parameterLongName: '--from-did',
      argumentName: 'FROM_DID',
      description: 'The DID you revoke the keyid from.',
      required: true,
    });

    this._signerKeyId = signerKeyIdParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending revoke key transaction with the following parameters:');
    console.log(`Vault Path: ${this._vaultPath.value}`);
    console.log(`KeyId to revoke: ${this._keyIdToRevoke.value}`);
    console.log(`DID: ${this._didFromRevoke.value}`);
    console.log(`Signer KeyId: ${this._signerKeyId.value}`);

    await checkIfSenderHasEnoughHydras(this._gasPassphrase.value!);
    await keyRevoke(
      this._vaultPath.value!,
      Crypto.authenticationFromData(this._keyIdToRevoke.value!),
      new Crypto.Did(this._didFromRevoke.value!),
      Crypto.authenticationFromData(this._signerKeyId.value!),
      this._gasPassphrase.value!,
    );
  }
}