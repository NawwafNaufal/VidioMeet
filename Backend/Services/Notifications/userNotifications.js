const notifications = require("../../Models/notifications")
const mongoose = require("mongoose")

const userNotificationsService = async (req,category) => {
        const userId = new mongoose.Types.ObjectId(String(req.result._id))

        const filter = category ? {category} : {}

        const notifUser = await notifications.aggregate([
            {
                $match : {
                    $or : [
                        {userId : null},
                        {userId : userId}
                    ]
                }
            },
            {
                $match : filter
            },
            {
                $lookup : {
                    from : "notificationsRead",
                    let : {notifId : "$_id"},
                    pipeline : [
                        {
                            $match : {
                                $expr : {
                                    $and : [
                                        {$eq : ["$notificationId","$$notifId"]},
                                        {$eq : ["$userId",userId]}
                                    ]
                                }
                            }
                        }
                    ],
                    as : "notifUserRead"
                }
            },
            {
                $addFields : {
                    statusRead : {
                        $gt : [{$size : "$notifUserRead"},0]
                    }
                }
            },
            {
                $addFields : {
                    dateRead : {
                        $cond : {
                            if : {$gt : [{$size : "$notifUserRead"},0]},
                            then : {$arrayElemAt : ["$notifUserRead.dateRead",0]},
                            else : null
                        }
                    }
                }
            },
            {
                $project : {notifUserRead : 0}
            },
            {
                $sort : {date : -1}
            }
        ])

        return notifUser
}

module.exports = userNotificationsService

