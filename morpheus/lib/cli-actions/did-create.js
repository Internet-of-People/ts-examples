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
const did_create_1 = require("../samples/did-create");
const vault_dump_1 = require("../samples/vault-dump");
const common_1 = require("./common");
class DidCreateAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'did-create',
            summary: 'Creates a DID using the vault at the given location.',
            documentation: 'Creates a DID using the vault at the given location.',
        });
    }
    onDefineParameters() {
        this.vaultPath = common_1.vaultPathParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Creating a DID with the following parameters:');
            console.log(`Vault Path: ${this.vaultPath.value}`);
            yield did_create_1.didCreate(this.vaultPath.value);
            yield vault_dump_1.vaultLoadAndDump(this.vaultPath.value);
        });
    }
}
exports.DidCreateAction = DidCreateAction;
//# sourceMappingURL=did-create.js.map