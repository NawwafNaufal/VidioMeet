const promo = require("../../Models/Subscription/promo")
const premium = require("../../Models/Subscription/premiumPlan")
const ResponseError = require("../../Error/responseError")

const promoService = async (name,discount,event,redeemCode,startDate,endDate,premiumPlanId) => {
    
    let statusIsHidden = false

    const dataPromo = await premium.findOne({ _id : premiumPlanId})
    if(!dataPromo) throw new ResponseError(400,"Id premium not exist")

    if(redeemCode) statusIsHidden = true

    const setPromo = new promo ({
        name,
        discount,
        event,
        redeemCode,
        startDate,
        endDate,
        premiumPlanId,
        isHidden : statusIsHidden
    })

    await setPromo.save()
}

module.exports = promoService