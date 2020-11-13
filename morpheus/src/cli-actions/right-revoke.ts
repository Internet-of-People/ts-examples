import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, networkParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { rightRevoke } from '../samples/right-revoke';

export class RightRevokeAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private keyIdToAdd!: CommandLineStringParameter;
  private onDid!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'right-revoke',
      summary: 'Revokes a right from a key on a DID.',
      documentation: 'Revokes a right from a key on a DID.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.gasPassphrase = gasPassphraseParameter(this);

    this.keyIdToAdd = this.defineStringParameter({
      parameterLongName: '--keyid',
      argumentName: 'KEYID',
      description: 'The keyid you\'d like to revoke the right from.',
      required: true,
    });

    this.onDid = this.defineStringParameter({
      parameterLongName: '--on-did',
      argumentName: 'ON_DID',
      description: 'The DID that has the key which you revoke the right from.',
      required: true,
    });

    this.signerKeyId = signerKeyIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending revoke right transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- KeyId to revoke: ${this.keyIdToAdd.value!}`);
    console.log(`- DID: ${this.onDid.value!}`);
    console.log(`- Signer KeyId: ${this.signerKeyId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.gasPassphrase.value!);
    await rightRevoke(
      this.network.value!,
      this.vaultPath.value!,
      Crypto.authenticationFromData(this.keyIdToAdd.value!),
      new Crypto.Did(this.onDid.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.gasPassphrase.value!,
    );
  }
}
