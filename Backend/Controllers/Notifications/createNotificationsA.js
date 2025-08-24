const notificationsService = require("../../Services/Notifications/createNotifications")

const notificationsContrroler = async (req,res,next) => {
    const {title,detail,category} = req.notif
    const {userId} = req.notif

    try {
        const result = await  notificationsService(title,detail,category,userId)
        
        res.status(200).json({
            message : `Notifications has been send id: ${userId || "All"}`,
            data : result
        })  
    } catch (error) {
        return next(error)
    }
}

module.exports = notificationsContrroler