const userNotificationsService = require("../../Services/Notifications/userNotifications")

const userNotificationsContrroller = async (req,res,next) => {
    try {
        const result = await userNotificationsService(req)

        res.status(200).json({
            message : "Data notifications",
            data : result 
        })      
    } catch (error) {
        return next(error)
    }
}

module.exports = userNotificationsContrroller