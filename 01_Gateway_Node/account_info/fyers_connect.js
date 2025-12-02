import { fyersModel } from 'fyers-api-v3';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreating __dirname (Because it doesn't exist in ESM) note: use CommonJS for backwards compatibility or if you're using fyer's official code guide as of fyers-api-v3 version 1.4.2
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env from the Root Directory
dotenv.config({path: path.resolve(__dirname, '../../.env')})

// console.log("----- DIAGNOSTIC -----");
// console.log("Current Dir:", __dirname);
// console.log("App ID from env:", process.env.FYERS_APP_ID); 
// console.log("----------------------");

const fyers = new fyersModel({"path": "../Data/account_logs", "enableLogging": true})
fyers.setAppId(process.env.FYERS_APP_ID)
fyers.setRedirectUrl("https://trade.fyers.in/api-login/redirect-uri/index.html")

// let URL = await fyers.generateAuthCode()

let auth_code = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiJRU1hNVDhDM0tDIiwidXVpZCI6Ijg4ODhkNzc0YTc2YjRmYTA4MDNmNjFmN2EyNTUzYzZlIiwiaXBBZGRyIjoiIiwibm9uY2UiOiIiLCJzY29wZSI6IiIsImRpc3BsYXlfbmFtZSI6IllTMzc3MjIiLCJvbXMiOiJLMSIsImhzbV9rZXkiOiJlZDU3YjBhYTYzZmI4MDkyNzZlMzgyMjJhNmI4M2ViOGMzZWZjOWVhY2FkZmVlNDc4OWJiYzI4ZCIsImlzRGRwaUVuYWJsZWQiOiJZIiwiaXNNdGZFbmFibGVkIjoiWSIsImF1ZCI6IltcImQ6MVwiLFwiZDoyXCIsXCJ4OjBcIixcIng6MVwiLFwieDoyXCJdIiwiZXhwIjoxNzY0NzIyMDE3LCJpYXQiOjE3NjQ2OTIwMTcsImlzcyI6ImFwaS5sb2dpbi5meWVycy5pbiIsIm5iZiI6MTc2NDY5MjAxNywic3ViIjoiYXV0aF9jb2RlIn0.biOxM6kz39sPNEAxjyEXvrHJN8ulVsAyGlJGWPHeSas"

const data = {
    "client_id": process.env.FYERS_APP_ID,
    "secret_key": process.env.FYERS_SECRET_ID,
    "auth_code": auth_code,
} 

await fyers.generate_access_token(data).then((response) => {
    if(response.s == "ok") {
        fyers.setAccessToken(response.access_token)
    }
    else {  // error message handling yet to be made for frontend
        console.log("ERROR: generating access token: ", response)
    }
})

fyers.get_profile().then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err)
})

// example checker

await fyers.getQuotes(["NSE:SBIN-EQ","NSE:TCS-EQ"]).then((response) => {
    console.log(response);
}).catch((err) => {
    console.log(err);
})

await fyers.getMarketDepth({"symbol":["NSE:SBIN-EQ","NSE:TCS-EQ"],"ohlcv_flag":1}).then((response)=>{
    console.log(response)
}).catch((err)=>{
    console.log(err)
})