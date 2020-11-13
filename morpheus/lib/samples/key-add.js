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
const fs_1 = require("fs");
const sdk_1 = require("@internet-of-people/sdk");
const utils_1 = require("../utils");
const unlockPassword = 'correct horse battery staple';
exports.keyAdd = (network, vaultPath, keyIdToAdd, didToAdd, signerKeyId, expiresAtHeight, gasPassphrase) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedVault = yield fs_1.promises.readFile(vaultPath, { encoding: 'utf-8' });
    const vault = sdk_1.Crypto.Vault.load(JSON.parse(serializedVault));
    const morpheusPlugin = sdk_1.Crypto.MorpheusPlugin.get(vault);
    const networkConfig = utils_1.networkConfigFromNetwork(network);
    const layer1Api = yield sdk_1.Layer1.createApi(networkConfig);
    const layer2Api = sdk_1.Layer2.createMorpheusApi(networkConfig);
    const lastTxId = yield layer2Api.getLastTxId(didToAdd);
    const opAttempts = new sdk_1.Layer1.OperationAttemptsBuilder()
        .signWith(morpheusPlugin.priv(unlockPassword))
        .on(didToAdd, lastTxId)
        .addKey(keyIdToAdd, expiresAtHeight)
        .sign(signerKeyId)
        .getAttempts();
    const id = yield layer1Api.sendMorpheusTxWithPassphrase(opAttempts, gasPassphrase);
    console.log(`Add key txn was sent, id: ${id}`);
});
//# sourceMappingURL=key-add.js.map