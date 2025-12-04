import { fyersModel } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const fyers = new fyersModel({"path": "../Data/logs/login_logs", "enableLogging": true})
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path: path.resolve(__dirname, '../../.env')})    // Load .env from the Root Directory

async function getProfileInfo(access_token) {
    fyers.setAppId(process.env.FYERS_APP_ID)
    fyers.setAccessToken(access_token)

    await fyers.get_profile().then((Response) => {
        console.log(Response);
        
    }).catch((err) => {
        throw new Error(err)
    })
}

export default getProfileInfo