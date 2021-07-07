import { MorpheusCLI } from './morpheus-cli';

const cli: MorpheusCLI = new MorpheusCLI();
cli.execute().then()
  .catch((e) => {
    console.log(e);
  });
