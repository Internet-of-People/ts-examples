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
            documentation: 'Revokes a key from a DID.',
        });
    }
    onDefineParameters() {
        this.vaultPath = common_1.vaultPathParameter(this);
        this.gasPassphrase = common_1.gasPassphraseParameter(this);
        this.keyIdToRevoke = this.defineStringParameter({
            parameterLongName: '--keyid',
            argumentName: 'KEYID',
            description: 'The keyid you\'d like to remove from the did.',
            required: true,
        });
        this.didFromRevoke = this.defineStringParameter({
            parameterLongName: '--from-did',
            argumentName: 'FROM_DID',
            description: 'The DID you revoke the keyid from.',
            required: true,
        });
        this.signerKeyId = common_1.signerKeyIdParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending revoke key transaction with the following parameters:');
            console.log(`Vault Path: ${this.vaultPath.value}`);
            console.log(`KeyId to revoke: ${this.keyIdToRevoke.value}`);
            console.log(`DID: ${this.didFromRevoke.value}`);
            console.log(`Signer KeyId: ${this.signerKeyId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this.gasPassphrase.value);
            yield key_revoke_1.keyRevoke(this.vaultPath.value, sdk_1.Crypto.authenticationFromData(this.keyIdToRevoke.value), new sdk_1.Crypto.Did(this.didFromRevoke.value), sdk_1.Crypto.authenticationFromData(this.signerKeyId.value), this.gasPassphrase.value);
        });
    }
}
exports.KeyRevokeAction = KeyRevokeAction;
//# sourceMappingURL=key-revoke.js.map