const promo = require("../../Models/Subscription/promo")

const patchPromoService = async (_id,name,discount,startDate,endDate,isActive,premiumPlanId) => {
    const result = await promo.updateOne(
        {_id},
        {$set : {name,discount,startDate,endDate,isActive,premiumPlanId}}
    )

    return result
}

module.exports = patchPromoService