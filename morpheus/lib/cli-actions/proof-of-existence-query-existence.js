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
const proof_of_existence_query_existence_1 = require("../samples/proof-of-existence-query-existence");
const common_1 = require("./common");
class BeforeProofQueryExistenceAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'poe-query',
            summary: 'Queries if the given content id exists on the blockchain.',
            documentation: 'Queries if the given content id exists on the blockchain.',
        });
    }
    onDefineParameters() {
        this.contentId = this.defineStringParameter({
            parameterLongName: '--content-id',
            argumentName: 'CONTENT_ID',
            description: 'The content id you\'d like to query. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
            required: true,
        });
        this.height = this.defineIntegerParameter({
            parameterLongName: '--at-height',
            argumentName: 'AT_HEIGHT',
            description: 'Check existence at this height.',
            required: false,
        });
        this.network = common_1.networkParameter(this);
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Querying content id\'s existence:');
            console.log(`- Network: ${this.network.value}`);
            console.log(`- Content Id: ${this.contentId.value}`);
            console.log(`- At height: ${this.height.value ? this.height.value : '-'}`);
            yield proof_of_existence_query_existence_1.queryBeforeProofExistence(this.network.value, this.contentId.value, this.height.value);
        });
    }
}
exports.BeforeProofQueryExistenceAction = BeforeProofQueryExistenceAction;
//# sourceMappingURL=proof-of-existence-query-existence.js.map