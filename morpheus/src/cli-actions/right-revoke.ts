import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { rightRevoke } from "../samples/right-revoke";

export class RightRevokeAction extends CommandLineAction {
  private _vaultPath!: CommandLineStringParameter;
  private _gasPassphrase!: CommandLineStringParameter;
  private _keyIdToAdd!: CommandLineStringParameter;
  private _onDid!: CommandLineStringParameter;
  private _signerKeyId!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'right-revoke',
      summary: 'Revokes a right from a key on a DID.',
      documentation: 'Revokes a right from a key on a DID.'
    });
  }

  protected onDefineParameters(): void {
    this._vaultPath = vaultPathParameter(this);
    this._gasPassphrase = gasPassphraseParameter(this);

    this._keyIdToAdd = this.defineStringParameter({
      parameterLongName: '--keyid',
      argumentName: 'KEYID',
      description: 'The keyid you\'d like to revoke the right from.',
      required: true,
    });

    this._onDid = this.defineStringParameter({
      parameterLongName: '--on-did',
      argumentName: 'ON_DID',
      description: 'The DID that has the key which you revoke the right from.',
      required: true,
    });

    this._signerKeyId = signerKeyIdParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending revoke right transaction with the following parameters:');
    console.log(`Vault Path: ${this._vaultPath.value}`);
    console.log(`KeyId to revoke: ${this._keyIdToAdd.value}`);
    console.log(`DID: ${this._onDid.value}`);
    console.log(`Signer KeyId: ${this._signerKeyId.value}`);

    await checkIfSenderHasEnoughHydras(this._gasPassphrase.value!);
    await rightRevoke(
      this._vaultPath.value!,
      Crypto.authenticationFromData(this._keyIdToAdd.value!),
      new Crypto.Did(this._onDid.value!),
      Crypto.authenticationFromData(this._signerKeyId.value!),
      this._gasPassphrase.value!,
    );
  }
}