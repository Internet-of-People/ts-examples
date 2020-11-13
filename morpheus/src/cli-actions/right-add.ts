import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, networkParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { rightAdd } from '../samples/right-add';

export class RightAddAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private keyIdToAdd!: CommandLineStringParameter;
  private onDid!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'right-add',
      summary: 'Adds a right to a key on a DID.',
      documentation: 'Adds a right to a key on a DID.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.gasPassphrase = gasPassphraseParameter(this);

    this.keyIdToAdd = this.defineStringParameter({
      parameterLongName: '--keyid',
      argumentName: 'KEYID',
      description: 'The keyid you\'d like to add to the right.',
      required: true,
    });

    this.onDid = this.defineStringParameter({
      parameterLongName: '--on-did',
      argumentName: 'ON_DID',
      description: 'The DID that has the key which you add the right to.',
      required: true,
    });

    this.signerKeyId = signerKeyIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending add right transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- KeyId to add: ${this.keyIdToAdd.value!}`);
    console.log(`- DID: ${this.onDid.value!}`);
    console.log(`- Signer KeyId: ${this.signerKeyId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.gasPassphrase.value!);
    await rightAdd(
      this.network.value!, 
      this.vaultPath.value!,
      Crypto.authenticationFromData(this.keyIdToAdd.value!),
      new Crypto.Did(this.onDid.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.gasPassphrase.value!,
    );
  }
}
