import { getHostByNetwork, Layer2, Network, NetworkConfig } from '@internet-of-people/sdk';

export const queryBeforeProofExistence = async (
  contentId: string,
  height: number | undefined
) => {
  const api = Layer2.createApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  const exists = await api.beforeProofExists(contentId, height);
  console.log(`Content Id '${contentId}' exists: ${exists}`);
};