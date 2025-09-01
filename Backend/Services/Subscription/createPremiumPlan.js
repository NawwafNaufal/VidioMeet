const premiumPlan = require("../../Models/Subscription/premiumPlan")

const premiumPlanService = async (name,price,duration) => {
    const typePremium = new premiumPlan({
        name,
        price,
        duration
    })

    await typePremium.save()

    return typePremium
}

module.exports = premiumPlanService