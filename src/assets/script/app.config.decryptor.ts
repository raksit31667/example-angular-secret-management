import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();
const { argv } = require('yargs');

const appConfigFilePath = path.join(process.env.INIT_CWD as string, argv.file);
const appConfig = JSON.parse(fs.readFileSync(appConfigFilePath, 'utf8'));
console.log(CryptoJS.AES.decrypt(appConfig.data, process.env.ENCRYPTION_KEY as string).toString(CryptoJS.enc.Utf8));
