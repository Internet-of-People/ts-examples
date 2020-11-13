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
const register_1 = require("../samples/register");
const common_1 = require("./common");
class RegisterAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'register',
            summary: 'Registers a domain with the given data.',
            documentation: 'Registers a domain with the given data.',
        });
    }
    onDefineParameters() {
        this.domain = common_1.domainParameter(this);
        this.data = common_1.dataParameter(this);
        this.expiresAtHeight = common_1.expiresAtHeightParameter(this);
        this.registrationPolicy = this.defineChoiceParameter({
            parameterLongName: '--registration-policy',
            alternatives: ['owner', 'any'],
            description: 'TODO',
        });
        this.network = common_1.networkParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending domain registration with the following parameters:');
            console.log(`- Network: ${this.network.value}`);
            console.log(`- Domain: ${this.domain.value}`);
            console.log(`- Registration Policy: ${this.registrationPolicy.value || 'Not specified'}`);
            console.log(`- Data: ${this.data.value}`);
            console.log(`- Expires at Height: ${this.expiresAtHeight.value}`);
            yield register_1.sendRegister(this.network.value, this.domain.value, this.data.value, this.expiresAtHeight.value);
        });
    }
}
exports.RegisterAction = RegisterAction;
//# sourceMappingURL=register.js.map