import { fyersModel } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ensureAndMkdir from '../helpers/ensureAndMkdir.helper.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../../../../.env')});    // Load .env from the Root Directory
const logDir = path.join(__dirname, '../../../../Data/logs/stream_logs');