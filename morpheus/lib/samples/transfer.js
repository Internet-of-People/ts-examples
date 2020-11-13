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
const sdk_1 = require("@internet-of-people/sdk");
const utils_1 = require("../utils");
exports.sendTransfer = (network, senderPassphrase, toAddress, amountHyd) => __awaiter(void 0, void 0, void 0, function* () {
    const networkConfig = utils_1.networkConfigFromNetwork(network);
    const api = yield sdk_1.Layer1.createApi(networkConfig);
    const id = yield api.sendTransferTxWithPassphrase(senderPassphrase, toAddress, BigInt(amountHyd) * BigInt(1e8));
    console.log(`transfer txn was sent, id: ${id}`);
});
//# sourceMappingURL=transfer.js.map