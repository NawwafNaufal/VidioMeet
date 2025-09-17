const promo = require("../../Models/Subscription/promo")
const ResponseError = require("../../Error/responseError")

const patchPromoService = async (_id,name,discount,event,redeemCode,startDate,endDate,premiumPlanId) => {
    const verifId = await promo.findById({_id})
    
        if(!verifId){
            throw new ResponseError(400,"id is not exist")
        }

    const result = await promo.updateOne(
        {_id},
        {$set : {name,discount,event,redeemCode,startDate,endDate,premiumPlanId}}
    )

    return result
}

module.exports = patchPromoService