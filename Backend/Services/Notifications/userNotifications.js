const notifications = require("../../Models/notifications")

const userNotificationsService = async (req) => {
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
        })
        return notifUser
}

module.exports = userNotificationsService

