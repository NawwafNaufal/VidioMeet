const notificationsReadService = require("../../Services/Notifications/readNotifications")

const readNotifController = async (req,res,next) => {
    const {notificationId} = req.params

    try {
        await notificationsReadService(req,notificationId)
    
        res.status(200).json({
            message : "Notif read id " + notificationId
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = readNotifController