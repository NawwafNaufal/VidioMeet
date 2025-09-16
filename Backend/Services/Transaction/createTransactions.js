const midtransClient = require("midtrans-client")
require("dotenv").config()
const transaction  = require("../../Models/transaction")
const {nanoid} = require("nanoid")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")
const cache = require("../../Utils/Cache/cache")
const premium = require("../../Models/Subscription/premiumPlan")
const promoPremium = require("../../Models/Subscription/promo")

const createTransactionService = async (_id,premiumId,promoId) => {

    let promo = null
    let totalPrice = null

    const transactionNumber = `TRX-${nanoid(10)}`

    let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    })

    const user = await Users.findById({_id})
    if(!user)throw new ResponseError(400,"id is not exist")

    const getPremium = await premium.findById({_id : premiumId})
    if(!user)throw new ResponseError(400,"Premium plan not found")

    if (promoId) {
        const resultPromo = await promoPremium.findById({_id : promoId})
        if(premiumId != resultPromo.premiumPlanId){
            throw new ResponseError(400,"Promo only in type premium : " + resultPromo.premiumPlanId)
        }
        if(!user)throw new ResponseError(400,"Promo not found")
        promo = resultPromo.discount
        const total = (promo / 100) * getPremium.price
        totalPrice = getPremium.price - total
    }

    const verif = {
            premiumId,
            transactionNumber,
            price : getPremium.price,
            discount : promo ,
            gross_amount : totalPrice || getPremium.price,
            status : "pending",
            paymentMethod : "null"
        }
    
    const createTransaction = await transaction.create(verif)

    cache.set(_id,premiumId)

    let parameter = {
        "transaction_details": {
            "order_id": transactionNumber,
            "gross_amount": totalPrice || getPremium.price
        },
        "customer_details" : {
            "username" : user.username,
            "email" : user.email,
        },
        "item_details": [{
            "id": premiumId,
            "quantity": 1,
            "price": totalPrice || getPremium.price,
            "name": getPremium.name, 
        }],
        "enabled_payments": [
            "credit_card","bca_klikbca", "bca_klikpay",
            "bri_epay","permata_va","bca_va", "bni_va", 
            "bri_va","other_va", "gopay","indomaret",
            "shopeepay","other_qris","alfamart"],
    }

    const midtransResponse = await snap.createTransaction(parameter)
    
    return {createTransaction,midtransResponse}
}

module.exports = createTransactionService

