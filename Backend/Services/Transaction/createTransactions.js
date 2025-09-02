const midtransClient = require("midtrans-client")
require("dotenv").config()

const coreApi = new midtransClient.Snap({
    isProduction : false,
    clientKey : process.env.MIDTRANS_CLIENT_KEY,
    serverKey : process.env.MIDTRANS_SERVER_KEY
})