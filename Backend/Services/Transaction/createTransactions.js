const midtransClient = require("midtrans-client")
require("dotenv").config()
const transaction  = require("../../Models/transaction")
const {nanoid} = require("nanoid")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")

const createTransactionService = async (premiumId,gross_amount,status,paymentMethod,date) => {

    const {_id} = req.result

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
        status,
        paymentMethod,
        date
    })

    await data.save()
    
    let snap = new midtransClient.Snap({
        isProduction : false,
        clientKey : process.env.MIDTRANS_CLIENT_KEY,
        serverKey : process.env.MIDTRANS_SERVER_KEY
    })

    const parameter = {
        transactionDetails : {
            orderId : transactionNumber,
            gross_amount : gross_amount
        },
        customerDetails : {
            name : user.username,
            email : user.email,
        },
    }
    

    const midtransResponse = await snap.createTransaction(parameter)

    return {data,midtransResponse}
}

module.exports = createTransactionService

