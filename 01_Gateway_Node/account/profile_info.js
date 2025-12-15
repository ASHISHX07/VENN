import { fyersModel } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from '../helpers/ensureAndMkdir.helper.js';
import { writeFileSync } from 'fs';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});    // Load .env from the Root Directory
const logDir = path.join(__dirname, '../../Data/logs/account_logs');
const authCodeFilePath = path.resolve(__dirname, '../../Data/cache/auth_code.txt');
const accessTokenFilePath = path.resolve(__dirname, '../../Data/cache/access_token.txt');
const fyers = new fyersModel({"path": ensureAndMkdir(logDir), "enableLogging": true});

async function getProfileInfo(access_token, checker = false) {
    fyers.setAppId(process.env.FYERS_APP_ID)
    fyers.setAccessToken(access_token);

    try {
        const response = await fyers.get_profile()
        if(checker) return true;
        console.log(response);
    }
    catch(err) {
        if(err.code == -8) {
            writeFileSync(accessTokenFilePath, '', 'utf8');
            writeFileSync(authCodeFilePath, '', 'utf8');
            console.log("Invalid Access Token passed, cleared access token and auth code from cache please rerun the program")
        }
        if(err.code == -352) {
            console.log("Invalid App ID provided please check you app ID");
            process.exit(0);
        }
        if(err.code == 500) {
            console.log("Issue from fyers side please check official updates")
            process.exit(0);
        }
        console.log(err);
        throw new Error(err);
    }
}

export default getProfileInfo