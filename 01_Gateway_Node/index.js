import { getAuthCodeM, getAccessToken } from "./connections/fyers_connect.js";
import getProfileInfo from "./account/profile_info.js";
import { readFileSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndRead from "./helpers/ensureAndRead.helper.js";
import stockStream from "./data_streams/stock.stream.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const accessTokenFilePath = path.resolve(__dirname, '../Data/cache/access_token.txt');
const authCodeFilePath = path.resolve(__dirname, '../Data/cache/auth_code.txt');

let access_token = ensureAndRead(accessTokenFilePath);

if(!ensureAndRead(authCodeFilePath)) await getAuthCodeM();

if(!access_token) {
    await getAccessToken();
    access_token = readFileSync(accessTokenFilePath, 'utf8');
}

if (!access_token) process.exit(0);

// await getProfileInfo(access_token); // will be used when needed

await stockStream(access_token);