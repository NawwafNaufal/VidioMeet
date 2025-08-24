const schemaUserNotifications = require("../../Validation/schemaUserNotifications")

const validateUserNotifications = (req,res,next) => {
    const {error,value} = schemaUserNotifications.validate(req.query)

    if(error){
        return next(error)
    }

    req.userNotif = value
    next()
}

module.exports = validateUserNotifications