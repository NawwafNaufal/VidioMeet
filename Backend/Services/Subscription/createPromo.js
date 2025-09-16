const promo = require("../../Models/Subscription/promo")
const premium = require("../../Models/Subscription/premiumPlan")
const ResponseError = require("../../Error/responseError")

const promoService = async (name,discount,event,startDate,endDate,premiumPlanId) => {
    
    const dataPromo = await premium.findOne({ _id : premiumPlanId})
    if(!dataPromo) throw new ResponseError(400,"Id premium not exist")

    const setPromo = new promo ({
        name,
        discount,
        event,
        startDate,
        endDate,
        premiumPlanId
    })

    await setPromo.save()
}

module.exports = promoService