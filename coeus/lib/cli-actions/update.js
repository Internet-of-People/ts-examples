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
const update_1 = require("../samples/update");
const common_1 = require("./common");
class UpdateAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'update',
            summary: 'Updates the data of the given domain.',
            documentation: 'Updates the data of the given domain.',
        });
    }
    onDefineParameters() {
        this.domain = common_1.domainParameter(this);
        this.data = common_1.dataParameter(this);
        this.network = common_1.networkParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sending domain update with the following parameters:');
            console.log(`- Network: ${this.network.value}`);
            console.log(`- Domain: ${this.domain.value}`);
            console.log(`- Data: ${this.data.value}`);
            yield update_1.sendUpdate(this.network.value, this.domain.value, this.data.value);
        });
    }
}
exports.UpdateAction = UpdateAction;
//# sourceMappingURL=update.js.map