const mongoose = require('mongoose')

const otpCodeDb = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
    code : {
        type:String,
        required:true
    },
    date: {
        type: Date
    },
    expiresAt: {
        type: Date,
        expires: '5m'
    },
    type:{
        type:String,
        enum:['signUpOtp','resetPasswordOtp']
    },
},{timestamps : true})


const otp = mongoose.model('Otp',otpCodeDb,'Otp')

module.exports = otp