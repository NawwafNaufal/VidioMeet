const premiumPlan = require("../../Models/Subscription/premiumPlan")
const ResponseError = require("../../Error/responseError")

const deletePremiumPlanService = async (_id) => {

    const verifId = await premiumPlan.findById({_id})

    if(!verifId){
        throw new ResponseError(400,"id is not exist")
    }
    await premiumPlan.deleteOne({
        _id
    })
}

module.exports = deletePremiumPlanService

