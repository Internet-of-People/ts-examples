import { getHostByNetwork, Layer2, Network, NetworkConfig } from '@internet-of-people/sdk';

export const queryBeforeProofHistory = async (contentId: string) => {
  const api = Layer2.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  const history = await api.getBeforeProofHistory(contentId);
  console.log(`Content Id '${contentId}' history:`);
  console.log(JSON.stringify(history, undefined, 2));
};