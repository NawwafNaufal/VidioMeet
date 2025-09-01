const premiumPlanService = require("../../Services/Subscription/premiumPlan")

const premiumPlanController = async (req,res,next) => {
    const {name,price,duration} = req.body

    try {
        const result = await premiumPlanService(name,price,duration)
    
        res.status(201).json({
            message : "Premium plan succes added succesfully",
            data : result
        })
    } catch (error) {
        return next(error)
    }
        
    }

module.exports = premiumPlanController