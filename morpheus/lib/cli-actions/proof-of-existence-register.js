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
const proof_of_existence_register_1 = require("../samples/proof-of-existence-register");
const common_1 = require("./common");
class BeforeProofRegisterAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'poe-register',
            summary: 'Registers the given content id on the blockchain as a proof of existence.',
            documentation: 'Registers the given content id on the blockchain as a proof of existence.',
        });
    }
    onDefineParameters() {
        this.contentId = this.defineStringParameter({
            parameterLongName: '--content-id',
            argumentName: 'CONTENT_ID',
            description: 'The content id you\'d like to register. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
            required: true,
        });
        this.gasPassphrase = common_1.gasPassphraseParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending proof of existence registration with the following parameters:');
            console.log(`Content Id: ${this.contentId.value}`);
            yield common_1.checkIfSenderHasEnoughHydras(this.gasPassphrase.value);
            yield proof_of_existence_register_1.sendRegisterBeforeProof(this.contentId.value, this.gasPassphrase.value);
        });
    }
}
exports.BeforeProofRegisterAction = BeforeProofRegisterAction;
//# sourceMappingURL=proof-of-existence-register.js.map