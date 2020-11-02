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
const proof_of_existence_query_history_1 = require("../samples/proof-of-existence-query-history");
class BeforeProofQueryHistoryAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'poe-query-history',
            summary: 'Queries the given content id\'s history.',
            documentation: 'Queries the given content id\'s history.',
        });
    }
    onDefineParameters() {
        this.contentId = this.defineStringParameter({
            parameterLongName: '--content-id',
            argumentName: 'CONTENT_ID',
            description: 'The content id you\'d like to query. E.g. cju9BJweQhnkQ52NkeoEcKvZP_EjZ5lu2nKwH9gdr1AiFw',
            required: true,
        });
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Querying content id\'s existence:');
            console.log(`Content Id: ${this.contentId.value}`);
            yield proof_of_existence_query_history_1.queryBeforeProofHistory(this.contentId.value);
        });
    }
}
exports.BeforeProofQueryHistoryAction = BeforeProofQueryHistoryAction;
//# sourceMappingURL=proof-of-existence-query-history.js.map