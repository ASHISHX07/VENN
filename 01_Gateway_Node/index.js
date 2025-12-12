import { getAuthCodeM, getAccessToken } from "./connections/fyers_connect.js";
// import getProfileInfo from "./account/profile_info.js";
import { readFileSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndRead from "./helpers/ensureAndRead.helper.js";
import niftyStream from "./streams/sockets/indics/nifty.socket.js";
// import stockStream from "./streams/stock.stream.js"
// import exampleSocket from "./streams/sockets/example.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const accessTokenFilePath = path.resolve(__dirname, '../Data/cache/access_token.txt');
const authCodeFilePath = path.resolve(__dirname, '../Data/cache/auth_code.txt');

let access_token = ensureAndRead(accessTokenFilePath);

if(!access_token) {
    let authCode = ensureAndRead(authCodeFilePath);
    if(!authCode) {
        await getAuthCodeM();
    }
    await getAccessToken();
    access_token = readFileSync(accessTokenFilePath, 'utf8');
}

// await getProfileInfo(access_token); // will be used when needed

// await stockStream(access_token);

// await niftyStream(access_token);
