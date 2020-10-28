"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_command_line_1 = require("@rushstack/ts-command-line");
const vault_dump_1 = require("./cli-actions/vault-dump");
const vault_init_1 = require("./cli-actions/vault-init");
const did_create_1 = require("./cli-actions/did-create");
const proof_of_existence_query_existence_1 = require("./cli-actions/proof-of-existence-query-existence");
const proof_of_existence_query_history_1 = require("./cli-actions/proof-of-existence-query-history");
const proof_of_existence_register_1 = require("./cli-actions/proof-of-existence-register");
const transfer_1 = require("./cli-actions/transfer");
const key_add_1 = require("./cli-actions/key-add");
const key_revoke_1 = require("./cli-actions/key-revoke");
const right_add_1 = require("./cli-actions/right-add");
const right_revoke_1 = require("./cli-actions/right-revoke");
const did_tombstone_1 = require("./cli-actions/did-tombstone");
class MorpheusCLI extends ts_command_line_1.CommandLineParser {
    constructor() {
        super({
            toolFilename: 'morpheus',
            toolDescription: 'Morpheus CLI'
        });
        this.addAction(new vault_init_1.VaultInitAction());
        this.addAction(new vault_dump_1.VaultDumpAction());
        this.addAction(new did_create_1.DidCreateAction());
        this.addAction(new transfer_1.TransferAction());
        this.addAction(new proof_of_existence_register_1.BeforeProofRegisterAction());
        this.addAction(new proof_of_existence_query_existence_1.BeforeProofQueryExistenceAction());
        this.addAction(new proof_of_existence_query_history_1.BeforeProofQueryHistoryAction());
        this.addAction(new key_add_1.KeyAddAction());
        this.addAction(new key_revoke_1.KeyRevokeAction());
        this.addAction(new right_add_1.RightAddAction());
        this.addAction(new right_revoke_1.RightRevokeAction());
        this.addAction(new did_tombstone_1.DidTombstoneAction());
    }
    onDefineParameters() {
        // nothing to do here right now
    }
}
exports.MorpheusCLI = MorpheusCLI;
//# sourceMappingURL=morpheus-cli.js.map