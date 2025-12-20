import { fyersModel } from "fyers-api-v3";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from '../../helpers/ensureAndMkdir.helper.js';
let fyers = new fyersModel();

async function optionSymbolDepth(access_token, interval = 3000, symbol) {
    
    fyers.setAccessToken(access_token);
    try {
        fyers.getOptionChain(symbol)

    }
    catch (error) {
        
    }

}