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
exports.queryBeforeProofExistence = (network, contentId, height) => __awaiter(void 0, void 0, void 0, function* () {
    const networkConfig = utils_1.networkConfigFromNetwork(network);
    const api = sdk_1.Layer2.createMorpheusApi(networkConfig);
    const exists = yield api.beforeProofExists(contentId, height);
    console.log(`Content Id '${contentId}' exists: ${exists}`);
});
//# sourceMappingURL=proof-of-existence-query-existence.js.map