import { CommandLineParser } from '@rushstack/ts-command-line';
import { VaultDumpAction } from './cli-actions/vault-dump';
import { VaultInitAction } from './cli-actions/vault-init';
import { DidCreateAction } from './cli-actions/did-create';
import { BeforeProofQueryExistenceAction } from './cli-actions/proof-of-existence-query-existence';
import { BeforeProofQueryHistoryAction } from './cli-actions/proof-of-existence-query-history';
import { BeforeProofRegisterAction } from './cli-actions/proof-of-existence-register';
import { TransferAction } from './cli-actions/transfer';
import { KeyAddAction } from './cli-actions/key-add';
import { KeyRevokeAction } from './cli-actions/key-revoke';
import { RightAddAction } from './cli-actions/right-add';
import { RightRevokeAction } from './cli-actions/right-revoke';
import { DidTombstoneAction } from './cli-actions/did-tombstone';

export class MorpheusCLI extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'morpheus',
      toolDescription: 'Morpheus CLI'
    });

    this.addAction(new VaultInitAction());
    this.addAction(new VaultDumpAction());
    this.addAction(new DidCreateAction());
    this.addAction(new TransferAction());
    this.addAction(new BeforeProofRegisterAction());
    this.addAction(new BeforeProofQueryExistenceAction());
    this.addAction(new BeforeProofQueryHistoryAction());
    this.addAction(new KeyAddAction());
    this.addAction(new KeyRevokeAction());
    this.addAction(new RightAddAction());
    this.addAction(new RightRevokeAction());
    this.addAction(new DidTombstoneAction());
  }

  protected onDefineParameters(): void {
    // nothing to do here right now
  }
}
