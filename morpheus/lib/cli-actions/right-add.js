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
const right_add_1 = require("../samples/right-add");
class RightAddAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'right-add',
            summary: 'Adds a right to a key on a DID.',
            documentation: 'Adds a right to a key on a DID.'
        });
    }
    onDefineParameters() {
        this._vaultPath = common_1.vaultPathParameter(this);
        this._gasPassphrase = common_1.gasPassphraseParameter(this);
        this._keyIdToAdd = this.defineStringParameter({
            parameterLongName: '--keyid',
            argumentName: 'KEYID',
            description: 'The keyid you\'d like to add to the right.',
            required: true,
        });
        this._onDid = this.defineStringParameter({
            parameterLongName: '--on-did',
            argumentName: 'ON_DID',
            description: 'The DID that has the key which you add the right to.',
            required: true,
        });
        this._signerKeyId = common_1.signerKeyIdParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending add right transaction with the following parameters:');
            console.log(`Vault Path: ${this._vaultPath.value}`);
            console.log(`KeyId to add: ${this._keyIdToAdd.value}`);
            console.log(`DID: ${this._onDid.value}`);
            console.log(`Signer KeyId: ${this._signerKeyId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this._gasPassphrase.value);
            yield right_add_1.rightAdd(this._vaultPath.value, sdk_1.Crypto.authenticationFromData(this._keyIdToAdd.value), new sdk_1.Crypto.Did(this._onDid.value), sdk_1.Crypto.authenticationFromData(this._signerKeyId.value), this._gasPassphrase.value);
        });
    }
}
exports.RightAddAction = RightAddAction;
//# sourceMappingURL=right-add.js.map