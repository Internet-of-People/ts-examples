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
const transfer_1 = require("../samples/transfer");
class TransferAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'transfer',
            summary: 'Transfers the given amount of HYDs to the given address.',
            documentation: 'Transfers the given amount of HYDs to the given address.'
        });
    }
    onDefineParameters() {
        this._fromPassphrase = this.defineStringParameter({
            parameterLongName: '--from-passphrase',
            argumentName: 'FROM_PASSPHRASE',
            description: 'The wallet\'s passphrase from which you want to send the HYDs.',
            required: true,
        });
        this._toAddress = this.defineStringParameter({
            parameterLongName: '--to',
            argumentName: 'TO',
            description: 'The address you\'d like to transfer from the genesis wallet.',
            required: true,
        });
        this._amount = this.defineIntegerParameter({
            parameterLongName: '--amount',
            argumentName: 'AMOUNT',
            description: 'The amount in HYD you\'d like to transfer.',
            required: true,
        });
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending transfer with the following parameters:');
            console.log(`From: ${this._fromPassphrase.value}`);
            console.log(`To: ${this._toAddress.value}`);
            console.log(`Amount: ${this._amount.value} HYD`);
            yield transfer_1.sendTransfer(this._fromPassphrase.value, this._toAddress.value, BigInt(this._amount.value));
        });
    }
}
exports.TransferAction = TransferAction;
//# sourceMappingURL=transfer.js.map