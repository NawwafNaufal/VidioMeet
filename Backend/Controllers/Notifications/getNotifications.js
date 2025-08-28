const NotificationsRead = require("../../Models/notificationRead")
const Notifications = require("../../Models/notifications")
const mongoose = require("mongoose");

const getNotificationsService = async (req,res) => {
    // const getNotifications = 
    // await notificationRead.find({
    //     $or : [
    //         {userId : req.result._id},
    //         {userId : null},
    //     ]
    // })                                                
    // .populate("notificationId","title userId")
    // .populate({
    //     path: "notificationId",
    //     populate : {
    //         path : "userId",
    //         model : "User"
    //     }
    // })
     const userId = new mongoose.Types.ObjectId(String(req.result._id));

    const getNotifications = await Notifications.aggregate([
   {
    $match: {
      $or: [
        { userId: null },  
        { userId: userId }  
      ]
    }
  },
  {
    $lookup: {
      from: "notificationsRead",
      let: { notifId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$notificationId", "$$notifId"] },
                { $eq: ["$userId", userId] }
              ]
            }
          }
        }
      ],
      as: "userReadStatus"
    }
  },
  // {
  //   $addFields: {
  //     isReadByUser: { 
  //       $gt: [{ $size: "$userReadStatus" }, 0] 
  //     },
  //     dateRead: {
  //       $cond: {
  //         if: { $gt: [{ $size: "$userReadStatus" }, 0] },
  //         then: { $arrayElemAt: ["$userReadStatus.dateRead", 0] },
  //         else: null
  //       }
  //     }
  //   }
  // },
  // {
  //   $project: { userReadStatus: 0 } 
  // },
  // {
  //   $sort: { date: -1 } 
  // }
    ]);

    res.status(200).json({
        data : getNotifications
    })
}


module.exports = getNotificationsService