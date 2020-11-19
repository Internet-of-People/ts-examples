import { CoeusCLI } from './coeus-cli';

const cli: CoeusCLI = new CoeusCLI();
cli.execute().then().catch((e) => {console.log(e)});
