import { CommandLineAction, CommandLineIntegerParameter, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { sendTransfer } from "../samples/transfer";

export class TransferAction extends CommandLineAction {
  private _fromPassphrase!: CommandLineStringParameter;
  private _toAddress!: CommandLineStringParameter;
  private _amount!: CommandLineIntegerParameter;

  public constructor() {
    super({
      actionName: 'transfer',
      summary: 'Transfers the given amount of HYDs to the given address.',
      documentation: 'Transfers the given amount of HYDs to the given address.'
    });
  }

  protected onDefineParameters(): void {
    this._fromPassphrase = this.defineStringParameter({
      parameterLongName: '--from-passphrase',
      argumentName: 'FROM_PASSPHRASE',
      description: 'The wallet\'s passphrase from which you want to send the HYDs.',
      required: true,
    });

    this._toAddress = this.defineStringParameter({
      parameterLongName: '--to',
      argumentName: 'TO',
      description: 'The address you\'d like to transfer from the genesis wallet.',
      required: true,
    });

    this._amount = this.defineIntegerParameter({
      parameterLongName: '--amount',
      argumentName: 'AMOUNT',
      description: 'The amount in HYD you\'d like to transfer.',
      required: true,
    });
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending transfer with the following parameters:');
    console.log(`From: ${this._fromPassphrase.value}`);
    console.log(`To: ${this._toAddress.value}`);
    console.log(`Amount: ${this._amount.value} HYD`);

    await sendTransfer(
      this._fromPassphrase.value!,
      this._toAddress.value!,
      BigInt(this._amount.value),
    );
  }
}