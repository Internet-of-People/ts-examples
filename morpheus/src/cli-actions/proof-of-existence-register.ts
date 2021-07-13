import { CommandLineAction, CommandLineChoiceParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendRegisterBeforeProof } from '../samples/proof-of-existence-register';
import { checkIfSenderHasEnoughHydras, contentIdParameter, unlockPasswordParameter, networkParameter, vaultPathParameter } from './common';

export class BeforeProofRegisterAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private contentId!: CommandLineStringParameter;
  private unlockPassword!: CommandLineStringParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'poe-register',
      summary: 'Registers the given content id on the blockchain as a proof of existence.',
      documentation: 'Registers the given content id on the blockchain as a proof of existence.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.contentId = contentIdParameter(this);
    this.unlockPassword = unlockPasswordParameter(this);
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending proof of existence registration with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Content Id: ${this.contentId.value!}`);

    await checkIfSenderHasEnoughHydras(this.network.value!, this.vaultPath.value!);
    await sendRegisterBeforeProof(this.network.value!, this.vaultPath.value!, this.contentId.value!, this.unlockPassword.value!);
  }
}
