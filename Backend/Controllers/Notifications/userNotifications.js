const userNotificationsService = require("../../Services/Notifications/userNotifications")

const userNotificationsContrroller = async (req,res,next) => {
    const {category} = req.userNotif

    try {
        const result = await userNotificationsService(req,category)

        res.status(200).json({
            message : "Data notifications",
            category : category || "All",
            data : result 
        })      
    } catch (error) {
        return next(error)
    }
}

module.exports = userNotificationsContrroller