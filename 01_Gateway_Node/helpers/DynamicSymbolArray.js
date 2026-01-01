import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndRead from './ensureAndRead.helper';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../.env')});    // Load .env from the Root Directory

const cachePath = path.resolve(__dirname, ensureAndRead('../../Data/cache/dynamicArrayUpdaterCache.txt'));

let symbolArray = ['NSE:NIFTY2610626150CE'];

export default symbolArray;