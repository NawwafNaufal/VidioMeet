const premiumPlan = require("../../Models/Subscription/premiumPlan")

const patchPremiumPlan = async (name,price,duration,id) => {
    const result = await premiumPlan.updateOne(
        {id : id},
        {$set : {name,price,duration}}
    )
}