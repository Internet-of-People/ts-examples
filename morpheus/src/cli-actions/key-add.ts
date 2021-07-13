import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Crypto } from '@internet-of-people/sdk';
import { keyAdd } from '../samples/key-add';
import { authParameter, checkIfSenderHasEnoughHydras, didParameter, unlockPasswordParameter, networkParameter, signerKeyIdParameter, vaultPathParameter } from './common';

export class KeyAddAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private unlockPassword!: CommandLineStringParameter;
  private keyIdToAdd!: CommandLineStringParameter;
  private didToAdd!: CommandLineStringParameter;
  private signerKeyId!: CommandLineStringParameter;
  private expiresAtHeight!: CommandLineIntegerParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'key-add',
      summary: 'Adds a key to a DID.',
      documentation: 'Adds a key to a DID.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.unlockPassword = unlockPasswordParameter(this);
    this.keyIdToAdd = authParameter(this);
    this.didToAdd = didParameter(this);
    this.signerKeyId = signerKeyIdParameter(this);
    this.expiresAtHeight = this.defineIntegerParameter({
      parameterLongName: '--expires-at-height',
      argumentName: 'EXPIRES_AT_HEIGHT',
      description: 'The height when this key has to be expired.',
      required: false,
    });
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending add key transaction with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- KeyId to add: ${this.keyIdToAdd.value!}`);
    console.log(`- DID: ${this.didToAdd.value!}`);
    console.log(`- Signer KeyId: ${this.signerKeyId.value!}`);
    console.log(`- Expires at Height: ${this.expiresAtHeight.value!}`);
    
    await checkIfSenderHasEnoughHydras(this.network.value!, this.vaultPath.value!);
    await keyAdd(
      this.network.value!,
      this.vaultPath.value!,
      Crypto.authenticationFromData(this.keyIdToAdd.value!),
      new Crypto.Did(this.didToAdd.value!),
      Crypto.authenticationFromData(this.signerKeyId.value!),
      this.expiresAtHeight.value!,
      this.unlockPassword.value!,
    );
  }
}
