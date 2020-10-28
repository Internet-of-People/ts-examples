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
const vault_dump_1 = require("../samples/vault-dump");
class VaultDumpAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'vault-dump',
            summary: 'Dumps a vault at the location you provide.',
            documentation: 'Dumps a vault at the location you provide.'
        });
    }
    onDefineParameters() {
        this._at = this.defineStringParameter({
            parameterLongName: '--at',
            argumentName: 'AT',
            description: 'The path where the vault is saved.',
            required: true,
        });
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Dumping vault with the following parameters:');
            console.log(`At: ${this._at.value}`);
            yield vault_dump_1.vaultLoadAndDump(this._at.value);
        });
    }
}
exports.VaultDumpAction = VaultDumpAction;
//# sourceMappingURL=vault-dump.js.map