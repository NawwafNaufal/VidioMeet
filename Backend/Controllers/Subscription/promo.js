const promoService = require("../../Services/Subscription/createPromo")

const promoController = async (req,res,next) => {
    const {name,discount,event,redeemCode,startDate,endDate,premiumPlanId} = req.body

    try {
            const result = await promoService(name,discount,event,redeemCode,startDate,endDate,premiumPlanId)
        
            res.status(200).json({
                message : "promo added succesfully",
                data : result
            }) 
    } catch (error) {
        return next(error)
    }
}

module.exports = promoController
