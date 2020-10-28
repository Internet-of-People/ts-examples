import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { didTombstone } from '../samples/did-tombstone';

export class DidTombstoneAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private didToTombstone!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;

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

    this.didToTombstone = this.defineStringParameter({
      parameterLongName: '--did',
      argumentName: 'DID',
      description: 'The DID you\'d like to tombstone',
      required: true,
    });

    this.signerKeyId = signerKeyIdParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending tombstone did transaction with the following parameters:');
    console.log(`Vault Path: ${this.vaultPath.value!}`);
    console.log(`DID to tombstone: ${this.didToTombstone.value!}`);
    console.log(`Signer KeyId: ${this.signerKeyId.value!}`);

    await checkIfSenderHasEnoughHydras(this.gasPassphrase.value!);
    await didTombstone(
      this.vaultPath.value!,
      new Crypto.Did(this.didToTombstone.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.gasPassphrase.value!,
    );
  }
}
