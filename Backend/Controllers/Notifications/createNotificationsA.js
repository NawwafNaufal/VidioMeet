const notificationsService = require("../../Services/Notifications/createNotifications")

const notificationsContrroler = async (req,res,next) => {
    const {title,detail,category} = req.notif
    const {id} = req.notif

    try {
        const result = await notificationsService(id,title,detail,category)
        
        res.status(200).json({
            message : `Notifications has been send id: ${id || "All"}`,
            data : result
        })  
    } catch (error) {
        return next(error)
    }
}

module.exports = notificationsContrroler