const otp = require('../../Models/OtpCodeDb')
const emailSend = require('../../Utils/Emails/emailSend')
const expiresAtTime = require('../../Utils/Token/ExpiresAtTime')
const {randomOtp} = require('../../Utils/Token/randomString')
const Users = require("../../Models/SignUpDB")
const cache = require("../../Utils/Cache/cache")
require('dotenv').config()

const forgetPasswordControl =async (req,res) => {
    const {email} = req.body

    try {
        const userResult = await Users.findOne({email})
    
        if(!userResult){
            return res.send('Email tidak ada')
        }
    
        const result = new otp({
            code: randomOtp(),
            date: expiresAtTime().date,
            type: "resetPasswordOtp",
            expiresAtTime: expiresAtTime().dateEx
        })
    
        await result.save()
    
        emailSend(userResult.username,userResult.email)
    
        cache.set(userResult.email,(userResult.email,userResult.password))
    
        res.status(200).json({
            message :"Kode otp telah di kirim",
            data: result
        })
    } catch (error) {
        console.log(error.message + error.stack)
    }
}

module.exports = forgetPasswordControl