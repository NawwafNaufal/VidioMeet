const midtransClient = require('midtrans-client'); 
const transaction = require("../../Models/transaction")
require("dotenv")

const notificationMidtransServices = async (order_id) => {
    let coreApi = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    const transactionStatus = await coreApi.transaction.status(order_id)

    let status = "pending"
    if(transactionStatus.transaction_status === "settlement" || transactionStatus.transaction_status === "capture"){
        status = "success"
    }else if(transactionStatus.transaction_status === "cancel" || transactionStatus.transaction_status === "expire"){
        status = "failed"
    }

    const result = await transaction.findOneAndUpdate(
        {transactionNumber: order_id },
        {status},
        { new: true }
    )


    
    return {result,transactionStatus}
}

module.exports = notificationMidtransServices
