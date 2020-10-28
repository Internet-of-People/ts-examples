import { CommandLineAction, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendTransfer } from '../samples/transfer';

export class TransferAction extends CommandLineAction {
  private fromPassphrase!: CommandLineStringParameter;
  private toAddress!: CommandLineStringParameter;
  private amount!: CommandLineIntegerParameter;

  public constructor() {
    super({
      actionName: 'transfer',
      summary: 'Transfers the given amount of HYDs to the given address.',
      documentation: 'Transfers the given amount of HYDs to the given address.',
    });
  }

  protected onDefineParameters(): void {
    this.fromPassphrase = this.defineStringParameter({
      parameterLongName: '--from-passphrase',
      argumentName: 'FROM_PASSPHRASE',
      description: 'The wallet\'s passphrase from which you want to send the HYDs.',
      required: true,
    });

    this.toAddress = this.defineStringParameter({
      parameterLongName: '--to',
      argumentName: 'TO',
      description: 'The address you\'d like to transfer from the genesis wallet.',
      required: true,
    });

    this.amount = this.defineIntegerParameter({
      parameterLongName: '--amount',
      argumentName: 'AMOUNT',
      description: 'The amount in HYD you\'d like to transfer.',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending transfer with the following parameters:');
    console.log(`From: ${this.fromPassphrase.value!}`);
    console.log(`To: ${this.toAddress.value!}`);
    console.log(`Amount: ${this.amount.value!} HYD`);

    await sendTransfer(
      this.fromPassphrase.value!,
      this.toAddress.value!,
      BigInt(this.amount.value),
    );
  }
}
