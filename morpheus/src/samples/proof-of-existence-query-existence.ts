import { getHostByNetwork, Layer2, Network, NetworkConfig } from '@internet-of-people/sdk';

export const queryBeforeProofExistence = async(
  contentId: string,
  height: number | undefined,
): Promise<void> => {
  const api = Layer2.createMorpheusApi(NetworkConfig.fromUrl(getHostByNetwork(Network.LocalTestnet), 4703));
  const exists = await api.beforeProofExists(contentId, height);
  console.log(`Content Id '${contentId}' exists: ${exists}`);
};
