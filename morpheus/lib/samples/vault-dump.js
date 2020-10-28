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
exports.vaultLoadAndDump = (path) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('### Vault Dump ###');
    console.log(`- Path: ${path}`);
    const serialized = yield fs_1.promises.readFile(path, { encoding: 'utf-8' });
    const vault = sdk_1.Crypto.Vault.load(JSON.parse(serialized));
    const morpheusPlugin = sdk_1.Crypto.MorpheusPlugin.get(vault);
    const kind = morpheusPlugin.pub.personas;
    console.log('- Key Ids:');
    for (let i = 0; i < kind.count; ++i) {
        const pk = kind.key(i);
        const id = pk.keyId();
        console.log(`  - ${i}: ${id}`);
    }
    console.log('- DIDs:');
    for (let i = 0; i < kind.count; ++i) {
        const pk = kind.key(i);
        const id = pk.keyId();
        const did = sdk_1.Crypto.Did.fromKeyId(id);
        console.log(`  - ${i}: ${did}`);
    }
});
//# sourceMappingURL=vault-dump.js.map