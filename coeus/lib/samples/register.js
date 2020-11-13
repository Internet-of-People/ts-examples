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
const { CoeusTxBuilder, DomainName, HydraSigner, NoncedBundleBuilder, UserOperation, Principal, PrivateKey, SubtreePolicies, } = sdk_1.Coeus;
exports.sendRegister = (network, domain, data, expiresAtHeight) => __awaiter(void 0, void 0, void 0, function* () {
    const coin = utils_1.rustNetworkFromNetwork(network);
    const networkConfig = utils_1.networkConfigFromNetwork(network);
    const unlockPassword = 'unlock_password';
    const phrase = 'include pear escape sail spy orange cute despair witness trouble sleep torch wire burst unable brass expose fiction drift clock duck oxygen aerobic already';
    const vault = sdk_1.Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);
    const hydraParameters = new sdk_1.Crypto.HydraParameters(coin, 0);
    sdk_1.Crypto.HydraPlugin.rewind(vault, unlockPassword, hydraParameters);
    const hydra = sdk_1.Crypto.HydraPlugin.get(vault, hydraParameters);
    const hydraPrivate = hydra.priv(unlockPassword);
    const secpPrivateKey = hydraPrivate.key(0).privateKey();
    const secpPublicKey = secpPrivateKey.publicKey();
    const multicipherPrivateKey = PrivateKey.fromSecp(secpPrivateKey);
    const multicipherPublicKey = multicipherPrivateKey.publicKey();
    const layer1Api = yield sdk_1.Layer1.createApi(networkConfig);
    const layer1Nonce = BigInt(yield layer1Api.getWalletNonce(hydra.pub.key(0).address)) + BigInt(1);
    const layer2Api = sdk_1.Layer2.createCoeusApi(networkConfig);
    const layer2Nonce = BigInt(yield layer2Api.getLastNonce(multicipherPublicKey)) + BigInt(1);
    const noncedOps = new NoncedBundleBuilder()
        .add(UserOperation.register(new DomainName(domain), Principal.publicKey(multicipherPublicKey), new SubtreePolicies(), JSON.parse(data), expiresAtHeight))
        .build(layer2Nonce);
    const signedOps = noncedOps.sign(multicipherPrivateKey);
    const tx = new CoeusTxBuilder(coin).build(signedOps, secpPublicKey, layer1Nonce);
    const signer = new HydraSigner(secpPrivateKey);
    const signedTx = signer.signHydraTransaction(tx);
    const txId = yield layer1Api.sendTx(signedTx);
    console.log(`Register tx sent. Tx ID: ${txId}`);
});
//# sourceMappingURL=register.js.map