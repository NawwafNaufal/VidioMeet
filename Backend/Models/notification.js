const mongoose = require("mongoose")

const notificationsDb = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    detail : {
        type : Text,
        required : true
    },
    date : {
        type : Date,
        default : new Date(),
        required : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
})

const notifications = mongoose.model("notifications",notificationsDb,"notifications")

module.exports = notifications