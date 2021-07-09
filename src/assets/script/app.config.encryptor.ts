import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();
const { argv } = require('yargs');

const appConfigFilePath = path.join(process.env.INIT_CWD as string, argv.file);
const appConfig = fs.readFileSync(appConfigFilePath, 'utf8');
const encryptedAppConfig = CryptoJS.AES.encrypt(appConfig, process.env.ENCRYPTION_KEY as string).toString();
console.log(JSON.stringify({ data: encryptedAppConfig }));
