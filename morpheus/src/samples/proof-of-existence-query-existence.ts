import { Layer2 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork } from '../utils';

export const queryBeforeProofExistence = async (
  network: string,
  contentId: string,
  height: number | undefined,
): Promise<void> => {
  const networkConfig = networkConfigFromNetwork(network);
  const api = Layer2.createMorpheusApi(networkConfig);
  const exists = await api.beforeProofExists(contentId, height);
  console.log(`Content ID '${contentId}' exists: ${exists}`);
};
