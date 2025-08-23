const schemaNotifications = require("../../Validation/schemaNotifications")

const validateNotifications = (req,res,next) => {
    const {error,value} = schemaNotifications.validate(req.body || req.params,{abortEarly : false})

    if(error){
        return next(error)
    }

    req.notif = value
    next()
} 

module.exports = validateNotifications