const premiumPlan = require("../../Models/Subscription/premiumPlan")

const patchPremiumService = async (name,price,duration,id) => {
    const result = await premiumPlan.updateOne(
        {id : id},
        {$set : {name,price,duration}}
    )
    return result
}

module.exports = patchPremiumService