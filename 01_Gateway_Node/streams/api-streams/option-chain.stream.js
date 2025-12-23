import { fyersModel } from "fyers-api-v3";
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from "../../helpers/ensureAndMkdir.helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, '../../../Data/logs/stream_logs/option-chain-logs');

async function optionChainStream(app_id, access_token, symbol, strikeCount, interval = 4000, logger = false, timeStamp = "") {
    
    const fyers = new fyersModel({"path": ensureAndMkdir(logDir), "enableLogging": logger});
    fyers.setAppId(app_id);
    fyers.setAccessToken(access_token);

    try {
        setInterval(() => {
            let optionData = fyers.getOptionChain({"symbol": symbol, "strikecount": strikeCount, "timestamp": timeStamp});
            console.log(optionData.data);
        }, interval);
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

export default optionChainStream;