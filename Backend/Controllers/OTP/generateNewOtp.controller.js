const emailSend = require('../../Utils/Emails/emailSend')
const {randomString} = require('../../Models/OtpCodeDb')
const cache = require('../../Utils/Cache/cache')
const expiresAtTime = require('../../Utils/Token/ExpiresAtTime')
const logger = require('../../log/Winston')

const randomNewOtp = async (req,res,next) => {
    emailSend(cache.username,cache.email)

    try {
        const resultOtp = new otp ({
            code : randomString,
            date : expiresAtTime().date,
            expiresAt : expiresAtTime().dateEx,
            type : 'signUpOtp',
        })
        await resultOtp.save()
    
        res.status(200).json({
            message : 'Otp has been send',
            data : resultOtp
        })
    } catch (error) {
        next(error)
    }
}

module.exports = randomNewOtp

