import { CommandLineParser } from '@rushstack/ts-command-line';
import { DeleteAction } from './cli-actions/delete';
import { RegisterAction } from './cli-actions/register';
import { RenewAction } from './cli-actions/renew';
import { TransferAction } from './cli-actions/transfer';
import { UpdateAction } from './cli-actions/update';

export class CoeusCLI extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'coeus',
      toolDescription: 'Coeus CLI'
    });

    this.addAction(new RegisterAction());
    this.addAction(new UpdateAction());
    this.addAction(new RenewAction());
    this.addAction(new TransferAction());
    this.addAction(new DeleteAction());
  }

  protected onDefineParameters(): void {
    // nothing to do here right now
  }
}
