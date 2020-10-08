/* eslint no-undefined: 0 */
import { getHostByNetwork, Layer1, Layer2, Network, NetworkConfig } from '@internet-of-people/sdk';
import { BeforeProof, Key, Right, Tombstone, Transfer, Vault } from './actions';
import { askForNetwork, chooseAction } from './utils';

const rootActions = [ BeforeProof, Key, Right, Tombstone, Transfer, Vault ];

const asyncRun = async(): Promise<void> => {
  const rootAction = await chooseAction(rootActions, process.argv[2]);

  if (rootAction && !rootAction.ignoreNetwork) {
    const network = await askForNetwork();
    let networkConfig: NetworkConfig;

    if(network == Network.LocalTestnet) {
      networkConfig = NetworkConfig.fromUrl(getHostByNetwork(network), 4703);
    }
    else {
      networkConfig = NetworkConfig.fromNetwork(network);
    }

    const layer1Api = await Layer1.createApi(networkConfig);
    const layer2Api = Layer2.createApi(networkConfig);

    await rootAction.run(layer1Api, layer2Api);
  } else {
    await rootAction.run(undefined, undefined);
  }
};

asyncRun().catch((e) => {
  return console.log('error: ', e);
});
