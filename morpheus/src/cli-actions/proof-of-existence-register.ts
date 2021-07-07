import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendRegisterBeforeProof } from '../samples/proof-of-existence-register';
import { checkIfSenderHasEnoughHydras, contentIdParameter, gasPassphraseParameter, networkParameter } from './common';

export class BeforeProofRegisterAction extends CommandLineAction {
  private contentId!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'poe-register',
      summary: 'Registers the given content id on the blockchain as a proof of existence.',
      documentation: 'Registers the given content id on the blockchain as a proof of existence.',
    });
  }

  protected onDefineParameters(): void {
    this.contentId = contentIdParameter(this);
    this.gasPassphrase = gasPassphraseParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending proof of existence registration with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Content Id: ${this.contentId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.gasPassphrase.value!);
    await sendRegisterBeforeProof(this.network.value!, this.contentId.value!, this.gasPassphrase.value!);
  }
}
