"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_command_line_1 = require("@rushstack/ts-command-line");
const sdk_1 = require("@internet-of-people/sdk");
const common_1 = require("./common");
const did_tombstone_1 = require("../samples/did-tombstone");
class DidTombstoneAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'did-tombstone',
            summary: 'Tombstones a DID.',
            documentation: 'Tombstones a DID.',
        });
    }
    onDefineParameters() {
        this.vaultPath = common_1.vaultPathParameter(this);
        this.gasPassphrase = common_1.gasPassphraseParameter(this);
        this.didToTombstone = this.defineStringParameter({
            parameterLongName: '--did',
            argumentName: 'DID',
            description: 'The DID you\'d like to tombstone',
            required: true,
        });
        this.signerKeyId = common_1.signerKeyIdParameter(this);
        this.network = common_1.networkParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending tombstone did transaction with the following parameters:');
            console.log(`- Network: ${this.network.value}`);
            console.log(`- Vault Path: ${this.vaultPath.value}`);
            console.log(`- DID to tombstone: ${this.didToTombstone.value}`);
            console.log(`- Signer KeyId: ${this.signerKeyId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this.network.value, this.gasPassphrase.value);
            yield did_tombstone_1.didTombstone(this.network.value, this.vaultPath.value, new sdk_1.Crypto.Did(this.didToTombstone.value), sdk_1.Crypto.authenticationFromData(this.signerKeyId.value), this.gasPassphrase.value);
        });
    }
}
exports.DidTombstoneAction = DidTombstoneAction;
//# sourceMappingURL=did-tombstone.js.map