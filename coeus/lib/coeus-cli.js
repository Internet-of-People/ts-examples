"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_command_line_1 = require("@rushstack/ts-command-line");
const delete_1 = require("./cli-actions/delete");
const register_1 = require("./cli-actions/register");
const renew_1 = require("./cli-actions/renew");
const transfer_1 = require("./cli-actions/transfer");
const update_1 = require("./cli-actions/update");
class CoeusCLI extends ts_command_line_1.CommandLineParser {
    constructor() {
        super({
            toolFilename: 'coeus',
            toolDescription: 'Coeus CLI',
        });
        this.addAction(new register_1.RegisterAction());
        this.addAction(new update_1.UpdateAction());
        this.addAction(new renew_1.RenewAction());
        this.addAction(new transfer_1.TransferAction());
        this.addAction(new delete_1.DeleteAction());
    }
    onDefineParameters() {
        // nothing to do here right now
    }
}
exports.CoeusCLI = CoeusCLI;
//# sourceMappingURL=coeus-cli.js.map