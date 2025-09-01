const patchPromoService = require("../../Services/Subscription/patchPromo")

const patchPromoController = async (req,res,next) => {
    const {name,discount,startDate,endDate,isActive,premiumPlanId} = req.body
    const {_id} = req.params
    
    const result = await patchPromoService(_id,name,discount,startDate,endDate,isActive,premiumPlanId)

    res.status(201).json({
        message : `Data ${_id} success updated`,
        data : result
    })
}

module.exports = patchPromoController