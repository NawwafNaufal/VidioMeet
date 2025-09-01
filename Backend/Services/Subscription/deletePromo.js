const promo = require("../../Models/Subscription/promo")
const ResponseError = require("../../Error/responseError")

const deletePromoService = async (_id) => {
    const verifId = await promo.findById({_id})
    
        if(!verifId){
            throw new ResponseError(400,"id is not exist")
        }

    await promo.deleteOne({_id})
}

module.exports = deletePromoService