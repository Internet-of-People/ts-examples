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
const unlockPassword = 'correct horse battery staple';
exports.didCreate = (vaultPath) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedVault = yield fs_1.promises.readFile(vaultPath, { encoding: 'utf-8' });
    const vault = sdk_1.Crypto.Vault.load(JSON.parse(serializedVault));
    const morpheusPlugin = sdk_1.Crypto.MorpheusPlugin.get(vault);
    const priv = morpheusPlugin.priv(unlockPassword);
    // adds a new did at the next index
    const did = priv.personas.did(priv.personas.count);
    const serializedUpdatedVault = JSON.stringify(vault.save());
    yield fs_1.promises.writeFile(vaultPath, serializedUpdatedVault, { encoding: 'utf-8' });
    console.log('New did created', did.toString());
});
//# sourceMappingURL=did-create.js.map