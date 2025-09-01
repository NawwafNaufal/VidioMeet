const mongoose = require("mongoose")

const notificationsDb = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        required : true
    },
    category : {
        type : String,
        enum : ["transaction","news"],
        require : true
    },
    date : {
        type : Date,
        default : Date.now,
        required : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        default : null,
    }
},{timestamps : true})

notificationsDb.index({date : -1,userId : 1})

const notifications = mongoose.model("notifications",notificationsDb,"notifications")

module.exports = notifications