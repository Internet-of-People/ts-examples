import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { authParameter, checkIfSenderHasEnoughHydras, didParameter, unlockPasswordParameter, networkParameter, rightParameter, signerKeyIdParameter, vaultPathParameter } from './common';
import { rightRevoke } from '../samples/right-revoke';

export class RightRevokeAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private unlockPassword!: CommandLineStringParameter;
  private authToRevoke!: CommandLineStringParameter;
  private toDid!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;
  private right!: CommandLineChoiceParameter;
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
    this.unlockPassword = unlockPasswordParameter(this);
    this.authToRevoke = authParameter(this);
    this.toDid = didParameter(this);
    this.right = rightParameter(this);
    this.signerKeyId = signerKeyIdParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending revoke right transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- KeyId to revoke: ${this.authToRevoke.value!}`);
    console.log(`- DID: ${this.toDid.value!}`);
    console.log(`- Signer KeyId: ${this.signerKeyId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.vaultPath.value!);
    await rightRevoke(
      this.network.value!,
      this.vaultPath.value!,
      Crypto.authenticationFromData(this.authToRevoke.value!),
      new Crypto.Did(this.toDid.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.right.value!,
      this.unlockPassword.value!,
    );
  }
}
