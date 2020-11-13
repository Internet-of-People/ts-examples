import { Crypto, getHostByNetwork, Network, NetworkConfig } from '@internet-of-people/sdk';

export const rustNetworkFromNetwork = (network: string): string => {
  switch(network) {
    case 'local-testnet':
      return Crypto.Coin.Hydra.Testnet;
    case 'testnet':
      return Crypto.Coin.Hydra.Testnet;
    case 'devnet':
      return Crypto.Coin.Hydra.Devnet;
    case 'mainnet':
      return Crypto.Coin.Hydra.Mainnet;
    default:
      throw new Error(`Not supported network: ${network}`);
  }
};

export const networkConfigFromNetwork = (network: string): NetworkConfig => {
  switch(network) {
    case 'local-testnet':
      return NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703);
    case 'testnet':
      return NetworkConfig.fromNetwork(Network.Testnet);
    case 'devnet':
      return NetworkConfig.fromNetwork(Network.Devnet);
    case 'mainnet':
      return NetworkConfig.fromNetwork(Network.Mainnet);
    default:
      throw new Error(`Not supported network: ${network}`);
  }
};