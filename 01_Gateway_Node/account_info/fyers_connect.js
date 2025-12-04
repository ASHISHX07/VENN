import { fyersModel } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { setTimeout } from 'timers/promises';
import { existsSync, mkdirSync, readFileSync, writeFileSync, } from "node:fs"

// Recreating __dirname (Because it doesn't exist in ESM) note: use CommonJS for backwards compatibility or if you're using fyer's official code guide as of fyers-api-v3 version 1.4.2
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path: path.resolve(__dirname, '../../.env')})    // Load .env from the Root Directory
const authCodeFilePath = path.resolve(__dirname, '../../Data/cache/auth_code.txt');
const accessTokenFilePath = path.resolve(__dirname, '../../Data/cache/access_token.txt');
const fyers = new fyersModel({"path": "../Data/logs/account_logs", "enableLogging": true})

function ensureAndRead(filePath) {
    try {
        return readFileSync(filePath, 'utf8').trim();
    }
    catch (error) {
        if (error.code == 'ENOENT') {
            const folderPath = path.dirname(filePath)
            if(!existsSync(folderPath)) {
                mkdirSync(folderPath, {recursive: true});
            }
            writeFileSync(filePath, "", 'utf8');
            return "";
        }
        else throw new Error("Error occured")
    }
}

// getting auth code
async function getAuthCodeM() {

    console.log("Make sure You're logged in with the same fyers account in your browser.");    
    await setTimeout(2000);
    console.log("Generating Auth Code....\n");
    
    fyers.setAppId(process.env.FYERS_APP_ID);
    fyers.setRedirectUrl(process.env.FYERS_REDIRECT_URL);
    let url = fyers.generateAuthCode();

    if(!url) {
        throw new Error("error while generating auth code please check environment file path, App id and run again the program\n")
    }
    else {
        console.log(`SUCCESS: Open the below link to get the auth code and paste it in the rootDir > data > cache > auth_code.txt and wait for few seconds\nNOTE: You have one minute to paste it in the file otehrwise the program will stop executing and you've to run again.\n\n${url}`)
    }
}

// generate access token
async function getAccessToken() {
    let authCode;
    let timer = 0;

    try {
        while(!authCode) {
            await setTimeout(5000);
            authCode = readFileSync(authCodeFilePath, 'utf8');
            timer += 1;
            if (timer >= 12) break;
        }
    } catch (error) {
        throw new Error(error);
    }

    const data = {
    "client_id": process.env.FYERS_APP_ID,
    "secret_key": process.env.FYERS_SECRET_ID,
    "auth_code": authCode,
    }
    
    await fyers.generate_access_token(data).then((response) => {
        if(response.code == 200) {
            fyers.setAccessToken(response.access_token);
            let { access_token } = response;
            let accessTokenCache = readFileSync(accessTokenFilePath, 'utf8');
            
            if(!accessTokenCache) {
                writeFileSync(accessTokenFilePath, access_token, 'utf8');
            }
        }
        else {  // error message handling yet to be made for frontend
            throw new Error("error while reading auth code please run the program again")
            
        }
    })
}

export {
    getAuthCodeM,
    getAccessToken,
    ensureAndRead,
}