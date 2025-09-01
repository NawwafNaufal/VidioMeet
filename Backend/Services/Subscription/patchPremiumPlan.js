const premiumPlan = require("../../Models/Subscription/premiumPlan")
const ResponseError = require("../../Error/responseError")

const patchPremiumService = async (name,price,duration,id) => {

    const verifId = await premiumPlan.findById({_id : id})
        
            if(!verifId){
                throw new ResponseError(400,"id is not exist")
            }

    const result = await premiumPlan.updateOne(
        {id : id},
        {$set : {name,price,duration}}
    )
    return result
}

module.exports = patchPremiumService