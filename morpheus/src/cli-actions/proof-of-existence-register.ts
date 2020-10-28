import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendRegisterBeforeProof } from '../samples/proof-of-existence-register';
import { checkIfSenderHasEnoughHydras, gasPassphraseParameter } from './common';

export class BeforeProofRegisterAction extends CommandLineAction {
  private contentId!: CommandLineStringParameter;
  private gasPassphrase!: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'poe-register',
      summary: 'Registers the given content id on the blockchain as a proof of existence.',
      documentation: 'Registers the given content id on the blockchain as a proof of existence.',
    });
  }

  protected onDefineParameters(): void {
    this.contentId = this.defineStringParameter({
      parameterLongName: '--content-id',
      argumentName: 'CONTENT_ID',
      description: 'The content id you\'d like to register. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
      required: true,
    });

    this.gasPassphrase = gasPassphraseParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending proof of existence registration with the following parameters:');
    console.log(`Content Id: ${this.contentId.value!}`);

    await checkIfSenderHasEnoughHydras(this.gasPassphrase.value!);
    await sendRegisterBeforeProof(this.contentId.value!, this.gasPassphrase.value!);
  }
}
