const promo = require("../../Models/Subscription/promo")

const promoService = async (name,discount,event,startDate,endDate,premiumPlanId) => {
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