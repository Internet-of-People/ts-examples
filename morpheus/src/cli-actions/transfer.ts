import { CommandLineAction, CommandLineChoiceParameter, CommandLineIntegerParameter, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { sendTransfer } from '../samples/transfer';
import { networkParameter, unlockPasswordParameter, vaultPathParameter } from './common';

export class TransferAction extends CommandLineAction {
  private vaultPath!: CommandLineStringParameter;
  private unlockPassword!: CommandLineStringParameter;
  private toAddress!: CommandLineStringParameter;
  private amount!: CommandLineIntegerParameter;
  private network!: CommandLineChoiceParameter;

  public constructor() {
    super({
      actionName: 'transfer',
      summary: 'Transfers the given amount of HYDs to the given address.',
      documentation: 'Transfers the given amount of HYDs to the given address.',
    });
  }

  protected onDefineParameters(): void {
    this.vaultPath = vaultPathParameter(this);
    this.unlockPassword = unlockPasswordParameter(this);

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
    this.network = networkParameter(this);
  }

  protected async onExecute(): Promise<void> {
    console.log('Sending transfer with the following parameters:');
    console.log(`- Network: ${this.network.value!}`);
    console.log(`- Vault Path: ${this.vaultPath.value!}`);
    console.log(`- To: ${this.toAddress.value!}`);
    console.log(`- Amount: ${this.amount.value!} HYD`);

    await sendTransfer(
      this.vaultPath.value!,
      this.network.value!,
      this.unlockPassword.value!,
      this.toAddress.value!,
      BigInt(this.amount.value!),
    );
  }
}
