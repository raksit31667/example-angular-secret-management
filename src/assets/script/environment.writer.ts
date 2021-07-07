import {writeFile} from "fs";

require('dotenv').config();
const { argv } = require('yargs');

function writeEnvironmentFile(targetPath: string, content: string) {
  writeFile(targetPath, content, err => {
    if (err) {
      console.log(err);
    }
    if (content !== '') {
      console.log(`Wrote variables to ${targetPath}`);
    }
  });
}

//create environment files if it does not exist
writeEnvironmentFile('./src/environments/environment.ts', '');
writeEnvironmentFile('./src/environments/environment.deployment.ts', '');

const isLocal = argv.environment === 'local';

const targetPath = isLocal
  ? './src/environments/environment.ts'
  : './src/environments/environment.deployment.ts';

const content = `
  export const environment = {
    production: ${!isLocal},
    encryptionKey: '${process.env.ENCRYPTION_KEY}'
  };
`;

writeEnvironmentFile(targetPath, content);
