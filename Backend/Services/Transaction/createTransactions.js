const midtransClient = require("midtrans-client")
require("dotenv").config()
const transaction  = require("../../Models/transaction")
const {nanoid} = require("nanoid")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")
const cache = require("../../Utils/Cache/cache")

const createTransactionService = async (_id,premiumId,gross_amount,name) => {
    const user = await Users.findById({_id})

    if(!user) {
        throw new ResponseError(400,"id is not exist")
    }

    const transactionNumber = `TRX-${nanoid(10)}`
    
    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })
        const data = new transaction({
            userId : _id,
            premiumId,
            transactionNumber,
            gross_amount,
            status : "pending",
            paymentMethod : "null",
        })
    
        await data.save()
    
        cache.set(_id,premiumId)

    let parameter = {
        "transaction_details": {
            "order_id": transactionNumber,
            "gross_amount": gross_amount
        },
        "customer_details" : {
            "username" : user.username,
            "email" : user.email,
        },
        "item_details": [{
            "id": premiumId,
            "quantity": 1,
            "price": gross_amount,
            "name": name, 
        }],
        "enabled_payments": [
            "credit_card","bca_klikbca", "bca_klikpay",
            "bri_epay","permata_va","bca_va", "bni_va", 
            "bri_va","other_va", "gopay","indomaret",
            "shopeepay","other_qris","alfamart"],
    }

    console.log(parameter)

    const midtransResponse = await snap.createTransaction(parameter)
    
    return {data,midtransResponse}
}

module.exports = createTransactionService

