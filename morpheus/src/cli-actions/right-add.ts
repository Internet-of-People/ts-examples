import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { authParameter, checkIfSenderHasEnoughHydras, didParameter, gasPassphraseParameter, networkParameter, rightParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { rightAdd } from '../samples/right-add';

export class RightAddAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private authToAdd!: CommandLineStringParameter;
  private toDid!: CommandLineStringParameter;
  private right!: CommandLineChoiceParameter;
  private signerAuth!: CommandLineStringParameter;
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

    this.authToAdd = authParameter(this);
    this.toDid = didParameter(this);
    this.right = rightParameter(this);
    this.signerAuth = signerKeyIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending add right transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- KeyId to add: ${this.authToAdd.value!}`);
    console.log(`- DID: ${this.toDid.value!}`);
    console.log(`- Right: ${this.right.value!}`);
    console.log(`- Signer KeyId: ${this.signerAuth.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.gasPassphrase.value!);
    await rightAdd(
      this.network.value!,
      this.vaultPath.value!,
      Crypto.authenticationFromData(this.authToAdd.value!),
      new Crypto.Did(this.toDid.value!),
      Crypto.authenticationFromData(this.signerAuth.value!),
      this.right.value!,
      this.gasPassphrase.value!,
    );
  }
}
