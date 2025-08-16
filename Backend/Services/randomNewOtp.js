const emailSend = require('../Utils/Emails/emailSend')
const {randomOtp} = require('../Utils/Token/randomString')
const cache = require('../Utils/Cache/cache')
const expiresAtTime = require('../Utils/Token/ExpiresAtTime')
const otp = require("../Models/OtpCodeDb")

const randomNewOtpService = async () => {
    emailSend(cache.username,cache.email)

    const randomString = randomOtp()

        const resultOtp = new otp ({
            code : randomString,
            date : expiresAtTime().date,
            expiresAt : expiresAtTime().dateEx,
            type : 'signUpOtp',
        })
        await resultOtp.save()

        return resultOtp

}

module.exports = randomNewOtpService

