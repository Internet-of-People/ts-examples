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
const sdk_wasm_1 = require("@internet-of-people/sdk-wasm");
const sdk_1 = require("@internet-of-people/sdk");
exports.sendTransfer = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    const network = sdk_1.Crypto.Coin.Hydra.Testnet;
    const unlockPassword = 'unlock_password';
    const hydraParameters = new sdk_1.Crypto.HydraParameters(network, 0);
    // ORIGINAL OWNER
    const phrase = 'include pear escape sail spy orange cute despair witness trouble sleep torch wire burst unable brass expose fiction drift clock duck oxygen aerobic already';
    const vault = sdk_1.Crypto.Vault.create(phrase, 'bip39_password', unlockPassword);
    sdk_1.Crypto.HydraPlugin.rewind(vault, unlockPassword, hydraParameters);
    const hydra = sdk_1.Crypto.HydraPlugin.get(vault, hydraParameters);
    const hydraPrivate = hydra.priv(unlockPassword);
    const secpPrivateKey = hydraPrivate.key(0).privateKey();
    const secpPublicKey = secpPrivateKey.publicKey();
    const multicipherPrivateKey = sdk_wasm_1.PrivateKey.fromSecp(secpPrivateKey);
    // NEW OWNER
    const phraseNewOwner = 'thumb agent inform iron text define merry pair caution inquiry chair blood extend empower range alone antique casual jazz manage ostrich length arrange become';
    const vaultNewOwner = sdk_1.Crypto.Vault.create(phraseNewOwner, 'bip39_password', unlockPassword);
    sdk_1.Crypto.HydraPlugin.rewind(vaultNewOwner, unlockPassword, hydraParameters);
    const hydraNewOwner = sdk_1.Crypto.HydraPlugin.get(vaultNewOwner, hydraParameters);
    const hydraPrivateNewOwner = hydraNewOwner.priv(unlockPassword);
    const secpPrivateKeyNewOwner = hydraPrivateNewOwner.key(0).privateKey();
    const multicipherPrivateKeyNewOwner = sdk_wasm_1.PrivateKey.fromSecp(secpPrivateKeyNewOwner);
    const multicipherPublicKeyNewOwner = multicipherPrivateKeyNewOwner.publicKey();
    const layer1Api = yield sdk_1.Layer1.createApi(sdk_1.NetworkConfig.fromUrl(sdk_1.getHostByNetwork(sdk_1.Network.LocalTestnet), 4703));
    // address is tfGrjiGiL3Rs4etZw6SchqXt8JJ1VFzNHB
    const currentNonce = yield layer1Api.getWalletNonce(hydra.pub.key(0).address);
    const noncedOps = new sdk_wasm_1.NoncedOperationsBuilder()
        .add(sdk_wasm_1.UserOperation.transfer(new sdk_wasm_1.DomainName(domain), sdk_wasm_1.Principal.publicKey(multicipherPublicKeyNewOwner.toString())))
        .build(BigInt(4)); // TODO: coeus nonce
    const signedOps = noncedOps.sign(multicipherPrivateKey);
    const tx = new sdk_wasm_1.CoeusTxBuilder(network)
        .build(signedOps, secpPublicKey, BigInt(currentNonce) + BigInt(1));
    const signer = new sdk_wasm_1.HydraSigner(secpPrivateKey);
    const signedTx = signer.signHydraTransaction(tx);
    const txId = yield layer1Api.sendTx(signedTx);
    console.log(`Register tx sent. Tx ID: ${txId}`);
});
//# sourceMappingURL=transfer.js.map