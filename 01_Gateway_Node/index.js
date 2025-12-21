import { getAuthCodeM, getAccessToken } from "./connections/fyers_connect.js";
import getProfileInfo from "./account/profile_info.js";
import { readFileSync } from "node:fs";
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import ensureAndRead from "./helpers/ensureAndRead.helper.js";
import marketStatus from "./market/marketStatus.js";
// import niftyStream from "./streams/sockets/indics/nifty.socket.js";
// import stockStream from "./streams/stock.stream.js"
// import exampleSocket from "./streams/sockets/example.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../.env')});    // Load .env from the Root Directory
const accessTokenFilePath = path.resolve(__dirname, '../Data/cache/access_token.txt');
const authCodeFilePath = path.resolve(__dirname, '../Data/cache/auth_code.txt');

const appId = process.env.FYERS_APP_ID
let accessToken = ensureAndRead(accessTokenFilePath);

if(!accessToken) {
    let authCode = ensureAndRead(authCodeFilePath);
    if(!authCode) {
        await getAuthCodeM(appId);
    }
    await getAccessToken(appId);
    accessToken = readFileSync(accessTokenFilePath, 'utf8');
}
let validate = await getProfileInfo(appId, accessToken, true)
if(validate) {
    console.log("\nauthentication done\n")
}

// await getProfileInfo(appId, access_token); // will be used when needed

// await stockStream(appId, access_token);

// await niftyStream(appId, accessToken);

await marketStatus(appId, accessToken, true);
