import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, networkParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { keyRevoke } from '../samples/key-revoke';

export class KeyRevokeAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private keyIdToRevoke!: CommandLineStringParameter;
  private didFromRevoke!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'key-revoke',
      summary: 'Revokes a key from a DID.',
      documentation: 'Revokes a key from a DID.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.gasPassphrase = gasPassphraseParameter(this);

    this.keyIdToRevoke = this.defineStringParameter({
      parameterLongName: '--keyid',
      argumentName: 'KEYID',
      description: 'The keyid you\'d like to remove from the did.',
      required: true,
    });

    this.didFromRevoke = this.defineStringParameter({
      parameterLongName: '--from-did',
      argumentName: 'FROM_DID',
      description: 'The DID you revoke the keyid from.',
      required: true,
    });

    this.signerKeyId = signerKeyIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending revoke key transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- KeyId to revoke: ${this.keyIdToRevoke.value!}`);
    console.log(`- DID: ${this.didFromRevoke.value!}`);
    console.log(`- Signer KeyId: ${this.signerKeyId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.gasPassphrase.value!);
    await keyRevoke(
      this.network.value!,
      this.vaultPath.value!,
      Crypto.authenticationFromData(this.keyIdToRevoke.value!),
      new Crypto.Did(this.didFromRevoke.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.gasPassphrase.value!,
    );
  }
}
