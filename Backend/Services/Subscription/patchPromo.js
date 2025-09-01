const promo = require("../../Models/Subscription/promo")
const ResponseError = require("../../Error/responseError")

const patchPromoService = async (_id,name,discount,startDate,endDate,isActive,premiumPlanId) => {
    const verifId = await promo.findById({_id})
    
        if(!verifId){
            throw new ResponseError(400,"id is not exist")
        }

    const result = await promo.updateOne(
        {_id},
        {$set : {name,discount,startDate,endDate,isActive,premiumPlanId}}
    )

    return result
}

module.exports = patchPromoService