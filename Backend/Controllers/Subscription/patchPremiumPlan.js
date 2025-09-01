const patchPremiumService = require("../../Services/Subscription/patchPremiumPlan")

const patchPremiumController = async (req,res,next) => {
    const {name,price,duration} = req.body
    const {id} = req.params

    try {
        const result = await patchPremiumService(name,price,duration,id)
    
        res.status(201).json({
            message : `Data ${id} succes updated`,
            data : result
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = patchPremiumController