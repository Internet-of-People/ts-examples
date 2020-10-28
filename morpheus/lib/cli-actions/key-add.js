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
const key_add_1 = require("../samples/key-add");
const common_1 = require("./common");
class KeyAddAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'key-add',
            summary: 'Adds a key to a DID.',
            documentation: 'Adds a key to a DID.'
        });
    }
    onDefineParameters() {
        this._vaultPath = common_1.vaultPathParameter(this);
        this._gasPassphrase = common_1.gasPassphraseParameter(this);
        this._keyIdToAdd = this.defineStringParameter({
            parameterLongName: '--keyid',
            argumentName: 'KEYID',
            description: 'The keyid you\'d like to add to the did.',
            required: true,
        });
        this._didToAdd = this.defineStringParameter({
            parameterLongName: '--to-did',
            argumentName: 'TO_DID',
            description: 'The DID you add the keyid to.',
            required: true,
        });
        this._signerKeyId = common_1.signerKeyIdParameter(this);
        this._expiresAtHeight = this.defineIntegerParameter({
            parameterLongName: '--expires-at-height',
            argumentName: 'EXPIRES_AT_HEIGHT',
            description: 'The height when this key has to be expired.',
            required: false,
        });
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending add key transaction with the following parameters:');
            console.log(`Vault Path: ${this._vaultPath.value}`);
            console.log(`KeyId to add: ${this._keyIdToAdd.value}`);
            console.log(`DID: ${this._didToAdd.value}`);
            console.log(`Signer KeyId: ${this._signerKeyId.value}`);
            console.log(`Expires at Height: ${this._expiresAtHeight.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this._gasPassphrase.value);
            yield key_add_1.keyAdd(this._vaultPath.value, sdk_1.Crypto.authenticationFromData(this._keyIdToAdd.value), new sdk_1.Crypto.Did(this._didToAdd.value), sdk_1.Crypto.authenticationFromData(this._signerKeyId.value), this._expiresAtHeight.value, this._gasPassphrase.value);
        });
    }
}
exports.KeyAddAction = KeyAddAction;
//# sourceMappingURL=key-add.js.map