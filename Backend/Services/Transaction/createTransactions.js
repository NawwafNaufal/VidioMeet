const midtransClient = require("midtrans-client")
require("dotenv").config()
const transaction  = require("../../Models/transaction")
const {nanoid} = require("nanoid")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")

const createTransactionService = async (_id,premiumId,gross_amount,paymentMethod) => {
    const user = await Users.findById({_id})

    if(!user) {
        throw new ResponseError(400,"id is not exist")
    }

    const transactionNumber = `TRX-${nanoid(10)}`
    
    const data = new transaction({
        userId : _id,
        premiumId,
        transactionNumber,
        gross_amount,
        status : "pending",
        paymentMethod,
    })

    await data.save()
    
    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    let parameter = {
        "transaction_details": {
            "order_id": transactionNumber,
            "gross_amount": gross_amount
        },
        "customer_details" : {
            "username" : user.username,
            "email" : user.email,
        },
    }

    console.log(parameter)
    
    const midtransResponse = await snap.createTransaction(parameter)
    console.log(midtransResponse)
    
    return {data,midtransResponse}
}

module.exports = createTransactionService

