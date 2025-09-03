const createTransactionService =  require("../../Services/Transaction/createTransactions")

const createTransactionController = async (req,res,next) => {

    const {premiumId,transactionNumber,gross_amount,status,paymentMethod,date} = req.body

    try {
        const result = await createTransactionService(premiumId,gross_amount,status,paymentMethod,date)
    
        res.status(200).json({
            message : "transaction proccess",
            data : result
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = createTransactionController

