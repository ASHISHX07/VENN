import { fyersModel } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from '../helpers/ensureAndMkdir.helper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});    // Load .env from the Root Directory
const logDir = path.join(__dirname, '../../Data/logs/stream_logs');
const fyers = new fyersModel({"path": ensureAndMkdir(logDir), "enableLogging": true});  

export default async function stockStream(access_token) {
    fyers.setAppId(process.env.FYERS_APP_ID)
    fyers.setAccessToken(access_token)
    
    setInterval(() => {
        fyers.getMarketDepth({"symbol":["NSE:NIFTY50-INDEX"],"ohlcv_flag":1})
        .then(
            (response)=>{
            console.log(response.d['NSE:NIFTY50-INDEX'].ltp);
        })
        .catch((err)=>{
            if(err.code == -15) {
                console.log("invalid/outdated access token")
                process.exit(0);
            }
        })        
    }, 1000);
}