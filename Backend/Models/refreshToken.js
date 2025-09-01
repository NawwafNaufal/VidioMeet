const mongoose = require("mongoose")

const refresTokenDb = new mongoose.Schema({
    token : {
        type: String,
        required: true,
        index : true
    },
    userId: {
        type:String,
        ref:'User',
        required: true,
        index: true
    },
    expiredAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
},{timestamps : true})

const refreshToken = mongoose.model('refreshToken',refresTokenDb,'refreshToken')

module.exports = refreshToken