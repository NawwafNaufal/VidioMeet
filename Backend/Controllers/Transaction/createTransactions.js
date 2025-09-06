const createTransactionService =  require("../../Services/Transaction/createTransactions")

const createTransactionController = async (req,res,next) => {

    const {premiumId,gross_amount,name} = req.body
    const {_id} = req.result

    try {
        const result = await createTransactionService(_id,premiumId,gross_amount,name)
    
        res.status(200).json({
            message : "transaction proccess",
            data : result
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = createTransactionController

