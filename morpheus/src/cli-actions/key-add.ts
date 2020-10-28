import { CommandLineAction, CommandLineIntegerParameter, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { Crypto } from '@internet-of-people/sdk';
import { keyAdd } from "../samples/key-add";
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, signerKeyIdParameter, vaultPathParameter } from './common';

export class KeyAddAction extends CommandLineAction {
  private _vaultPath!: CommandLineStringParameter;
  private _gasPassphrase!: CommandLineStringParameter;
  private _keyIdToAdd!: CommandLineStringParameter;
  private _didToAdd!: CommandLineStringParameter;
  private _signerKeyId!: CommandLineStringParameter;
  private _expiresAtHeight!: CommandLineIntegerParameter;

  public constructor() {
    super({
      actionName: 'key-add',
      summary: 'Adds a key to a DID.',
      documentation: 'Adds a key to a DID.'
    });
  }

  protected onDefineParameters(): void {
    this._vaultPath = vaultPathParameter(this);
    this._gasPassphrase = gasPassphraseParameter(this);

    this._keyIdToAdd = this.defineStringParameter({
      parameterLongName: '--keyid',
      argumentName: 'KEYID',
      description: 'The keyid you\'d like to add to the did.',
      required: true,
    });

    this._didToAdd = this.defineStringParameter({
      parameterLongName: '--to-did',
      argumentName: 'TO_DID',
      description: 'The DID you add the keyid to.',
      required: true,
    });

    this._signerKeyId = signerKeyIdParameter(this);

    this._expiresAtHeight = this.defineIntegerParameter({
      parameterLongName: '--expires-at-height',
      argumentName: 'EXPIRES_AT_HEIGHT',
      description: 'The height when this key has to be expired.',
      required: false,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending add key transaction with the following parameters:');
    console.log(`Vault Path: ${this._vaultPath.value}`);
    console.log(`KeyId to add: ${this._keyIdToAdd.value}`);
    console.log(`DID: ${this._didToAdd.value}`);
    console.log(`Signer KeyId: ${this._signerKeyId.value}`);
    console.log(`Expires at Height: ${this._expiresAtHeight.value}`);

    await checkIfSenderHasEnoughHydras(this._gasPassphrase.value!);
    await keyAdd(
      this._vaultPath.value!,
      Crypto.authenticationFromData(this._keyIdToAdd.value!),
      new Crypto.Did(this._didToAdd.value!),
      Crypto.authenticationFromData(this._signerKeyId.value!),
      this._expiresAtHeight.value!,
      this._gasPassphrase.value!,
    );
  }
}