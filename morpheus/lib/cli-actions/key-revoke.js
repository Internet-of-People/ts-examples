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
const key_revoke_1 = require("../samples/key-revoke");
class KeyRevokeAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'key-revoke',
            summary: 'Revokes a key from a DID.',
            documentation: 'Revokes a key from a DID.'
        });
    }
    onDefineParameters() {
        this._vaultPath = common_1.vaultPathParameter(this);
        this._gasPassphrase = common_1.gasPassphraseParameter(this);
        this._keyIdToRevoke = this.defineStringParameter({
            parameterLongName: '--keyid',
            argumentName: 'KEYID',
            description: 'The keyid you\'d like to remove from the did.',
            required: true,
        });
        this._didFromRevoke = this.defineStringParameter({
            parameterLongName: '--from-did',
            argumentName: 'FROM_DID',
            description: 'The DID you revoke the keyid from.',
            required: true,
        });
        this._signerKeyId = common_1.signerKeyIdParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending revoke key transaction with the following parameters:');
            console.log(`Vault Path: ${this._vaultPath.value}`);
            console.log(`KeyId to revoke: ${this._keyIdToRevoke.value}`);
            console.log(`DID: ${this._didFromRevoke.value}`);
            console.log(`Signer KeyId: ${this._signerKeyId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this._gasPassphrase.value);
            yield key_revoke_1.keyRevoke(this._vaultPath.value, sdk_1.Crypto.authenticationFromData(this._keyIdToRevoke.value), new sdk_1.Crypto.Did(this._didFromRevoke.value), sdk_1.Crypto.authenticationFromData(this._signerKeyId.value), this._gasPassphrase.value);
        });
    }
}
exports.KeyRevokeAction = KeyRevokeAction;
//# sourceMappingURL=key-revoke.js.map