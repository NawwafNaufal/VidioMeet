const mongoose = require("mongoose")

const refresTokenDb = new mongoose.Schema({
    token : {
        type: String,
        required: true
    },
    userId: {
        type:String,
        ref:'User',
        required: true
    },
    expiredAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
})

const refreshToken = mongoose.model('refreshToken',refresTokenDb,'refreshToken')

module.exports = refreshToken