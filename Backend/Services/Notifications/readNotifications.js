const notificationsRead = require("../../Models/notificationRead")

const notificationsReadService = async (req,notificationId) => {
    const {_id} = req.result

    const notif = new notificationsRead({
        isRead : true,
        notificationId,
        userId : _id,
        dateRead : new Date()
    })

    await notif.save()
}

module.exports = notificationsReadService