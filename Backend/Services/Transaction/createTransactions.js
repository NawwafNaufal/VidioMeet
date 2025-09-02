const midtransClient = require("midtrans-client")
require("dotenv").config()
const transaction  = require("../../Models/transaction")
const {nanoid} = require("nanoid")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")

const createTransactionService = async (premiumId,transactionNumber,gross_amount,status,paymentMethod,date) => {

    const {_id} = req.result

    const checkId = await Users.findById({_id})

    if(!checkId) {
        throw new ResponseError(400,"id is not exist")
    }

    let snap = new midtransClient.Snap({
        isProduction : false,
        clientKey : process.env.MIDTRANS_CLIENT_KEY,
        serverKey : process.env.MIDTRANS_SERVER_KEY
    })
    
    const parameter = new transaction({
        userId : _id,
        premiumId,
        transactionNumber : nanoid(10),
        gross_amount,
        status,
        paymentMethod,
        date
    })
    
    await parameter.save()

    snap.createTransaction(parameter)
}

module.exports = createTransactionService

