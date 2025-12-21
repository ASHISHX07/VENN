import { fyersModel } from "fyers-api-v3";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';
import ensureAndMkdir from "../helpers/ensureAndMkdir.helper.js";
import ensureAndRead from '../helpers/ensureAndRead.helper.js';
import { appendFile } from "fs/promises";
import * as os from "os";
import time12Hr from "../helpers/12hrTime.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});    // Load .env from the Root Directory
let time = new Date();
const logDir = path.join(__dirname, `../../Data/logs/market_logs/${time.getDate()}-${time.getMonth()}-${time.getFullYear()}-log`);
const logDirFilePath = path.resolve(__dirname, `${logDir}/market-status.log`);

const fyers = new fyersModel();

export default async function marketStatus(app_id, access_token, logger = false) {
    fyers.setAppId(app_id)
    fyers.setAccessToken(access_token);
    try {
        let status = await fyers.market_status()
        console.log(status);
        if (logger) {
            ensureAndMkdir(logDir);
            ensureAndRead(logDirFilePath);
            try {
                await appendFile(logDirFilePath, `${await time12Hr()}${os.EOL}${util.inspect(status, {depth: null, colors: false})}${os.EOL}`);
            }
            catch (err) {
                console.log("Error while logging to file: ", err);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}
