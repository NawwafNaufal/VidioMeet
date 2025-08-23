const mongoose = require("mongoose")

const notificationsReadDb = new mongoose.Schema({
    isRead : {
        type : Boolean,
    },
    notificationId : {
        type : mongoose.Schema.ObjectId,
        ref : "notifications"
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    dateRead : {
        type : Date,
        defautl : Date.now,
        required : true
    }
})

notificationsReadDb.index({ notificationId : 1, userId : 1})

const notificationsRead = mongoose.model("notificationsRead",notificationsReadDb,"notificationsRead")

module.exports = notificationsRead