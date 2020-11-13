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
            documentation: 'Adds a right to a key on a DID.',
        });
    }
    onDefineParameters() {
        this.vaultPath = common_1.vaultPathParameter(this);
        this.gasPassphrase = common_1.gasPassphraseParameter(this);
        this.keyIdToAdd = this.defineStringParameter({
            parameterLongName: '--keyid',
            argumentName: 'KEYID',
            description: 'The keyid you\'d like to add to the right.',
            required: true,
        });
        this.onDid = this.defineStringParameter({
            parameterLongName: '--on-did',
            argumentName: 'ON_DID',
            description: 'The DID that has the key which you add the right to.',
            required: true,
        });
        this.signerKeyId = common_1.signerKeyIdParameter(this);
        this.network = common_1.networkParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending add right transaction with the following parameters:');
            console.log(`- Network: ${this.network.value}`);
            console.log(`- Vault Path: ${this.vaultPath.value}`);
            console.log(`- KeyId to add: ${this.keyIdToAdd.value}`);
            console.log(`- DID: ${this.onDid.value}`);
            console.log(`- Signer KeyId: ${this.signerKeyId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this.network.value, this.gasPassphrase.value);
            yield right_add_1.rightAdd(this.network.value, this.vaultPath.value, sdk_1.Crypto.authenticationFromData(this.keyIdToAdd.value), new sdk_1.Crypto.Did(this.onDid.value), sdk_1.Crypto.authenticationFromData(this.signerKeyId.value), this.gasPassphrase.value);
        });
    }
}
exports.RightAddAction = RightAddAction;
//# sourceMappingURL=right-add.js.map