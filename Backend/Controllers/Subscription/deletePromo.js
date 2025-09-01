const deletePromoService = require("../../Services/Subscription/deletePromo")

const deletePromoController = async (req,res,next) => {
    const {_id} = req.params
    try {
        await deletePromoService(+id)

        res.status(200).json({
            message : `Data promo id: ${_id} success deleted`
        })
        
    } catch (error) {
        return next(error)
    }
}

module.exports = deletePromoController