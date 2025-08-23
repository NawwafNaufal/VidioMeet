const schemaNotifications = require("../../Validation/schemaNotifications")

const validateNotifications = (req,res,next) => {
    const data = {...req.body,...req.params}
    const {error,value} = schemaNotifications.validate(data,{abortEarly : false})

    if(error){
        return next(error)
    }

    req.notif = value
    next()
} 

module.exports = validateNotifications