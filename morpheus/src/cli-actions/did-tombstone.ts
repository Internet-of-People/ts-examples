import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, didParameter, gasPassphraseParameter, networkParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { didTombstone } from '../samples/did-tombstone';

export class DidTombstoneAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private didToTombstone!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'did-tombstone',
      summary: 'Tombstones a DID.',
      documentation: 'Tombstones a DID.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.gasPassphrase = gasPassphraseParameter(this);
    this.didToTombstone = didParameter(this);
    this.signerKeyId = signerKeyIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending tombstone did transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- DID to tombstone: ${this.didToTombstone.value!}`);
    console.log(`- Signer KeyId: ${this.signerKeyId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.gasPassphrase.value!);
    await didTombstone(
      this.network.value!,
      this.vaultPath.value!,
      new Crypto.Did(this.didToTombstone.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.gasPassphrase.value!,
    );
  }
}
