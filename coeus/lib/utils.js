"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@internet-of-people/sdk");
exports.rustNetworkFromNetwork = (network) => {
    switch (network) {
        case 'local-testnet':
            return sdk_1.Crypto.Coin.Hydra.Testnet;
        case 'testnet':
            return sdk_1.Crypto.Coin.Hydra.Testnet;
        case 'devnet':
            return sdk_1.Crypto.Coin.Hydra.Devnet;
        case 'mainnet':
            return sdk_1.Crypto.Coin.Hydra.Mainnet;
        default:
            throw new Error(`Not supported network: ${network}`);
    }
};
exports.networkConfigFromNetwork = (network) => {
    switch (network) {
        case 'local-testnet':
            return sdk_1.NetworkConfig.fromUrl(sdk_1.getHostByNetwork(sdk_1.Network.LocalTestnet), 4703);
        case 'testnet':
            return sdk_1.NetworkConfig.fromNetwork(sdk_1.Network.Testnet);
        case 'devnet':
            return sdk_1.NetworkConfig.fromNetwork(sdk_1.Network.Devnet);
        case 'mainnet':
            return sdk_1.NetworkConfig.fromNetwork(sdk_1.Network.Mainnet);
        default:
            throw new Error(`Not supported network: ${network}`);
    }
};
//# sourceMappingURL=utils.js.map