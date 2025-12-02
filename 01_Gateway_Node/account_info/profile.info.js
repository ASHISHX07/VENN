import fyersModel from "fyers-api-v3";

let fyers = new fyersModel({"path": "../Data/access.log", "enableLogging":true})
fyers.setAppId(process.env.FYERS_APP_ID)
fyers.setRedirectUrl("https://trade.fyers.in/api-login/redirect-uri/index.html")

let URL = fyers.generateAuthCode()
console.log(URL)