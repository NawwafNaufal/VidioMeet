const mongoose = require("mongoose")

const notificationsReadDb = new mongoose.Schema({
    isRead : {
        type : boolean,
    },
    notificationId : {
        type : mongoose.Schema.ObjectId(),
        ref : "notifications"
    },
    userId : {
        type : mongoose.Schema.ObjectId(),
        ref : "User"
    }
})

const notificationsRead = mongoose.model("notificationsRead",notificationsReadDb,"notificationsRead")

module.exports = notificationsRead