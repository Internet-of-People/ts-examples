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
        this.vaultPath = common_1.vaultPathParameter(this);
        this.gasPassphrase = common_1.gasPassphraseParameter(this);
        this.keyIdToAdd = this.defineStringParameter({
            parameterLongName: '--keyid',
            argumentName: 'KEYID',
            description: 'The keyid you\'d like to add to the did.',
            required: true,
        });
        this.didToAdd = this.defineStringParameter({
            parameterLongName: '--to-did',
            argumentName: 'TO_DID',
            description: 'The DID you add the keyid to.',
            required: true,
        });
        this.signerKeyId = common_1.signerKeyIdParameter(this);
        this.expiresAtHeight = this.defineIntegerParameter({
            parameterLongName: '--expires-at-height',
            argumentName: 'EXPIRES_AT_HEIGHT',
            description: 'The height when this key has to be expired.',
            required: false,
        });
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending add key transaction with the following parameters:');
            console.log(`Vault Path: ${this.vaultPath.value}`);
            console.log(`KeyId to add: ${this.keyIdToAdd.value}`);
            console.log(`DID: ${this.didToAdd.value}`);
            console.log(`Signer KeyId: ${this.signerKeyId.value}`);
            console.log(`Expires at Height: ${this.expiresAtHeight.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this.gasPassphrase.value);
            yield key_add_1.keyAdd(this.vaultPath.value, sdk_1.Crypto.authenticationFromData(this.keyIdToAdd.value), new sdk_1.Crypto.Did(this.didToAdd.value), sdk_1.Crypto.authenticationFromData(this.signerKeyId.value), this.expiresAtHeight.value, this.gasPassphrase.value);
        });
    }
}
exports.KeyAddAction = KeyAddAction;
//# sourceMappingURL=key-add.js.map