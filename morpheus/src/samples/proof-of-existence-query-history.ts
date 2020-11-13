import { Layer2 } from '@internet-of-people/sdk';
import { networkConfigFromNetwork } from '../utils';

export const queryBeforeProofHistory = async(network: string, contentId: string): Promise<void> => {
  const networkConfig = networkConfigFromNetwork(network);
  const api = Layer2.createMorpheusApi(networkConfig);
  const history = await api.getBeforeProofHistory(contentId);
  console.log(`Content Id '${contentId}' history:`);
  /* eslint-disable-next-line no-undefined */
  console.log(JSON.stringify(history, undefined, 2));
};
