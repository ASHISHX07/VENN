import { getAuthCodeM, getAccessToken, ensureAndRead } from "./connections/fyers_connect.js";
import getProfileInfo from "./account_info/profile_info.js";
import { readFileSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';

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

getProfileInfo(access_token)
