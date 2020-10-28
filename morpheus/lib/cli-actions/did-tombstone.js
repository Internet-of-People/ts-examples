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
            documentation: 'Tombstones a DID.'
        });
    }
    onDefineParameters() {
        this._vaultPath = common_1.vaultPathParameter(this);
        this._gasPassphrase = common_1.gasPassphraseParameter(this);
        this._didToTombstone = this.defineStringParameter({
            parameterLongName: '--did',
            argumentName: 'DID',
            description: 'The DID you\'d like to tombstone',
            required: true,
        });
        this._signerKeyId = common_1.signerKeyIdParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending tombstone did transaction with the following parameters:');
            console.log(`Vault Path: ${this._vaultPath.value}`);
            console.log(`DID to tombstone: ${this._didToTombstone.value}`);
            console.log(`Signer KeyId: ${this._signerKeyId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this._gasPassphrase.value);
            yield did_tombstone_1.didTombstone(this._vaultPath.value, new sdk_1.Crypto.Did(this._didToTombstone.value), sdk_1.Crypto.authenticationFromData(this._signerKeyId.value), this._gasPassphrase.value);
        });
    }
}
exports.DidTombstoneAction = DidTombstoneAction;
//# sourceMappingURL=did-tombstone.js.map