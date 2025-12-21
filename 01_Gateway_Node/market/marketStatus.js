import { fyersModel } from "fyers-api-v3";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from "../helpers/ensureAndMkdir.helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});    // Load .env from the Root Directory
const logDir = path.join(__dirname, `../../Data/logs/market_logs/depth-logs`);


export default async function marketStatus(app_id, access_token, logger = false) {
    const fyers = new fyersModel({"path": ensureAndMkdir(logDir), "enableLogging": logger});
    fyers.setAppId(app_id)
    fyers.setAccessToken(access_token);
    try {
        let status = await fyers.market_status()
        ensureAndMkdir(logDir);
        console.log(status);
    }
    catch (err) {
        console.log(err);
    }
}
