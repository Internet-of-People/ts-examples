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
const crypto_1 = require("@arkecosystem/crypto");
const sdk_1 = require("@internet-of-people/sdk");
const utils_1 = require("../utils");
exports.checkIfSenderHasEnoughHydras = (network, passphrase) => __awaiter(void 0, void 0, void 0, function* () {
    const networkConfig = utils_1.networkConfigFromNetwork(network);
    const api = yield sdk_1.Layer1.createApi(networkConfig);
    const address = crypto_1.Identities.Address.fromPassphrase(passphrase);
    const balance = yield api.getWalletBalance(address);
    if (balance < BigInt(1e8)) {
        throw new Error(`${address} does not have enough HYD to send a transaction. It has: ${balance} Flakes`);
    }
});
exports.gasPassphraseParameter = (ref) => {
    return ref.defineStringParameter({
        parameterLongName: '--gas-passphrase',
        argumentName: 'GAS_PASSPHRASE',
        description: 'The wallet that pays for the blockchain transaction.',
        required: true,
    });
};
exports.vaultPathParameter = (ref) => {
    return ref.defineStringParameter({
        parameterLongName: '--vault-path',
        argumentName: 'VAULT_PATH',
        description: 'The path where the vault is saved.',
        required: true,
    });
};
exports.signerKeyIdParameter = (ref) => {
    return ref.defineStringParameter({
        parameterLongName: '--signer-keyid',
        argumentName: 'SIGNER_KEYID',
        description: 'The keyid that signs this morpheus operation.',
        required: true,
    });
};
exports.networkParameter = (ref) => {
    return ref.defineChoiceParameter({
        parameterLongName: '--network',
        alternatives: ['local-testnet', 'testnet', 'devnet', 'mainnet'],
        description: 'The network you would like to run against the script.',
        required: false,
        defaultValue: 'local-testnet'
    });
};
//# sourceMappingURL=common.js.map