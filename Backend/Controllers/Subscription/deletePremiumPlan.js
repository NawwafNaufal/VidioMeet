const deletePremiumPlanService = require("../../Services/Subscription/deletePremiumPlan")

const deletePremiumPlanController = async (req,res,next) => {
    const {_id} = req.params

    try {
        await deletePremiumPlanService(_id)
    
        res.status(200).json({
            messsage : `Data premium plan id: ${_id} success deleted`
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = deletePremiumPlanController