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
exports.queryBeforeProofHistory = (contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const api = sdk_1.Layer2.createMorpheusApi(sdk_1.NetworkConfig.fromUrl(sdk_1.getHostByNetwork(sdk_1.Network.LocalTestnet), 4703));
    const history = yield api.getBeforeProofHistory(contentId);
    console.log(`Content Id '${contentId}' history:`);
    console.log(JSON.stringify(history, undefined, 2));
});
//# sourceMappingURL=proof-of-existence-query-history.js.map