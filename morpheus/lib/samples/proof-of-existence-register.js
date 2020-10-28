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
exports.sendRegisterBeforeProof = (contentId, passphrase) => __awaiter(void 0, void 0, void 0, function* () {
    const opAttempts = new sdk_1.Layer1.OperationAttemptsBuilder()
        .registerBeforeProof(contentId)
        .getAttempts();
    const api = yield sdk_1.Layer1.createApi(sdk_1.NetworkConfig.fromUrl(sdk_1.getHostByNetwork(sdk_1.Network.LocalTestnet), 4703));
    const id = yield api.sendMorpheusTxWithPassphrase(opAttempts, passphrase);
    console.log(`Proof of existence txn was sent, id: ${id}`);
});
//# sourceMappingURL=proof-of-existence-register.js.map