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
const renew_1 = require("../samples/renew");
const common_1 = require("./common");
class RenewAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'renew',
            summary: 'Renews the given domain.',
            documentation: 'Renews the given domain.',
        });
    }
    onDefineParameters() {
        this.domain = common_1.domainParameter(this);
        this.expiresAtHeight = common_1.expiresAtHeightParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending domain renewal with the following parameters:');
            console.log(`Domain: ${this.domain.value}`);
            console.log(`Expires at Height: ${this.expiresAtHeight.value}`);
            yield renew_1.sendRenew(this.domain.value, this.expiresAtHeight.value);
        });
    }
}
exports.RenewAction = RenewAction;
//# sourceMappingURL=renew.js.map