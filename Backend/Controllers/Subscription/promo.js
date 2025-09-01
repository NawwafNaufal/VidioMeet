const promoService = require("../../Services/Subscription/promo")

const promoController = async (req,res,next) => {
    const {name,discount,event,startDate,endDate} = req.body
    const {premiumPlanId} = req.params

    try {
            const result = await promoService(name,discount,event,startDate,endDate,premiumPlanId)
        
            res.status(200).json({
                message : "promo added succesfully",
                data : result
            }) 
    } catch (error) {
        return next(error)
    }
}

module.exports = promoController
