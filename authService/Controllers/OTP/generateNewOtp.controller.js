const emailSend = require('../../Utils/Emails/emailSend')
const {randomString} = require('../../Models/OtpCodeDb')
const cache = require('../../Utils/Cache/cache')
const expiresAtTime = require('../../Utils/Token/ExpiresAtTime')
const logger = require('../../log/Winston')

const randomNewOtp = async (req,res) => {
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
        if(error.message){
            logger.warn(error.message)
            return res.status(400).json({
                message : error.message
            })
        }
        logger.error(`Internal Server Error ${error.message} ${error.stack}`)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

module.exports = randomNewOtp

