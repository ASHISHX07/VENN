import { fyersDataSocket } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from '../../../helpers/ensureAndMkdir.helper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../../../.env')});    // Load .env from the Root Directory
const logDir = path.join(__dirname, '../../../../Data/logs/stream_logs');

async function niftyStream(app_id, access_token) {
    let socket = fyersDataSocket.getInstance(`${app_id}:${access_token}`, ensureAndMkdir(logDir), true)

    socket.on("connect", function(){
        socket.subscribe(['NSE:NIFTY50-INDEX'])
        socket.mode(socket.FullMode)
    })

    socket.on("message", function(message) {
        console.log({"TEST":message});
    })

    socket.on("error",function(message) {
        console.log("erroris",message);
    })

    socket.on("close",function() {
        console.log("socket closed");
    })

    socket.connect()
    
}

export default niftyStream;