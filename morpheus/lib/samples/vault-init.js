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
exports.vaultInit = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const vault = sdk_1.Crypto.Vault.create(sdk_1.Crypto.Seed.demoPhrase(), '', unlockPassword);
    const serialized = JSON.stringify(vault.save());
    yield fs_1.promises.writeFile(path, serialized, { encoding: 'utf-8' });
});
//# sourceMappingURL=vault-init.js.map