const midtransClient = require('midtrans-client'); 
const transaction = require("../../Models/transaction")
const Users = require("../../Models/SignUpDB")
require("dotenv").config()
const cache = require("../../Utils/Cache/cache")


//Need konsep transactional db

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
    
    let startDate = null
    let endDate = null
    const date = new Date()
    
    const getPremiumId = cache.get(id)

    const duration = new Map([
        ["68bce2d44db3ed0c31449d33", 30],   
        ["68bce2eb4db3ed0c31449d35", 90],   
        ["68bce3334db3ed0c31449d37", 180],  
        ["68bce35d4db3ed0c31449d39", 365],  
    ])

    if(duration.has(getPremiumId)){
        startDate = date
        endDate = new Date(date.getTime() + duration.get(getPremiumId) * 24 * 60 * 60 * 1000)
    }
    // if(getPremiumId === alias.get("Mounthin")){
    //     startDate = date
    //     endDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    // }
    // if(getPremiumId === alias.get("Threesongs")){
    //     startDate = date
    //     endDate = new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000)
    // }
    // if(getPremiumId === alias.get("Sixbloods")){
    //     startDate = date
    //     endDate = new Date(date.getTime() + 180 * 24 * 60 * 60 * 1000)
    // }
    // if(getPremiumId === alias.get("Yearsir")){
    //     startDate = date
    //     endDate = new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000)
    // }
    
    const userSubsription = await Users.updateOne(
        {_id : id},
        {$set : {
            "subscription.premiumPlaId" : getPremiumId,
            "subscription.startDate" : startDate,
            "subscription.endDate" : endDate
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
