const notifications = require("../../Models/notifications")

const userNotificationsService = async (req,category) => {
        const user = req.result

        const {_id} = user

        const notifUser = await notifications.find({
            $or : [
                {
                    userId : _id
                },
                {
                    userId : null
                }
            ]
        }).where(category)
        return notifUser
}

module.exports = userNotificationsService

