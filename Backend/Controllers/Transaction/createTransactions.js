const createTransactionService =  require("../../Services/Transaction/createTransactions")

const createTransactionController = async (req,res,next) => {

    const {premiumId,promoId} = req.body
    const {_id} = req.result

    try {
        const result = await createTransactionService(_id,premiumId,promoId)
    
        res.status(200).json({
            message : "transaction proccess",
            data : result
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = createTransactionController

