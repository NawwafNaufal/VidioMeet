const notifications = require("../../Models/notifications")
const mongoose = require("mongoose")

const userNotificationsService = async (req,category,isread) => {
    const filter = category ? {category} : {}

    const convert = isread !== undefined ? JSON.parse(isread) : undefined
    const filterIsRead = convert !== undefined ? { statusRead: convert } : {}

    const userId = new mongoose.Types.ObjectId(String(req.result._id))

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
                    },
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
                $facet : {
                    list : [
                        {$match : filterIsRead},
                        {$project : {notifUserRead : 0}},
                        {$sort : {date : -1}}
                    ],
                    unreadCount : [
                        {$match : {statusRead : false}},
                        {$count : "total"}
                    ]
                }
            }
        ])

        const [{list,unreadCount}] = notifUser
        const totalUnread = unreadCount[0]?.total || o
        
        return {list,totalUnread}
}

module.exports = userNotificationsService

