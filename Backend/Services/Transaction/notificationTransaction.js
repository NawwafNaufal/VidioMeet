const midtransClient = require('midtrans-client'); 
const transaction = require("../../Models/transaction")
const Users = require("../../Models/SignUpDB")
require("dotenv").config()
const cache = require("../../Utils/Cache/cache")

const notificationMidtransServices = async (order_id,id) => {
    let coreApi = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    const transactionStatus = await coreApi.transaction.status(order_id)
    const paymentType = transactionStatus.payment_type
    const transactionId = transactionStatus.transaction_id

    let status = "pending"
    if(transactionStatus.transaction_status === "settlement" || transactionStatus.transaction_status === "capture"){
        status = "success"
    }else if(transactionStatus.transaction_status === "cancel" || transactionStatus.transaction_status === "expire"){
        status = "failed"
    }
    
    const startDate = {}
    const endDate = {}
    const date = new Date()
    
    const getPremiumId = cache.get(id)

    const alias = new Map([
        ["Mounthin","68bce2d44db3ed0c31449d33"],
        ["Threesongs","68bce2eb4db3ed0c31449d35"],
        ["Sixbloods","68bce3334db3ed0c31449d37"],
        ["Yearsir","68bce35d4db3ed0c31449d39"],
    ])

    if(getPremiumId === alias.get("Mounthin")){
        startDate.startDate = date
        endDate.endDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    }
    if(getPremiumId === "68bce2eb4db3ed0c31449d35"){
        startDate.startDate = date
        endDate.endDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    }
    if(getPremiumId === "68bce3334db3ed0c31449d37"){
        startDate.startDate = date
        endDate.endDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    }
    if(getPremiumId === "68bce35d4db3ed0c31449d39"){
        startDate.startDate = date
        endDate.endDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    }
    
    const userSubsription = await Users.updateOne(
        {_id : id},
        {$set : {
            premiumPlaId : getPremiumId,startDate,endDate
            }
        }
    )

    const result = await transaction.findOneAndUpdate(
        {transactionNumber: order_id },
        {status,paymentMethod : paymentType,transactionId},
        { new: true }
    )

    return {result,transactionStatus,userSubsription}
}

module.exports = notificationMidtransServices
