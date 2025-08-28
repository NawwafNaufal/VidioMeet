const userNotificationsService = require("../../Services/Notifications/userNotifications")

const userNotificationsContrroller = async (req,res,next) => {
    const {category,isread} = req.userNotif

    try {
        const {list,totalUnread} = await userNotificationsService(req,category,isread)

        res.status(200).json({
            message : "Data notifications",
            category : category || "All",
            statusRead : isread || "All",
            unreadCount : totalUnread,
            data : list
        })      
    } catch (error) {
        return next(error)
    }
}

module.exports = userNotificationsContrroller