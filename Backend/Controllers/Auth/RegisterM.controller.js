const valiSignup = require('../../Services/ValidateSignUp')
const {randomOtp} = require('../../Utils/Token/randomString')
const logger = require('../../log/Winston')
const otp = require('../../Models/OtpCodeDb')
const cache = require('../../Utils/Cache/cache')
const emailSend = require('../../Utils/Emails/emailSend')
const expiresAtTime = require('../../Utils/Token/ExpiresAtTime')


const signUpController = async (req,res,next) => {
    const {username,email,password,dateOfBirth} = req.fullNameValidate

    try {                
        await valiSignup(username,email)

        emailSend(username,email)

        const otpCode = randomOtp()
        const expired = expiresAtTime()
        
        const otpResult = new otp({
            code : otpCode,
            date : expired.date,
            expiresAt : expired.dateEx,
            type : 'signUpOtp',
        })
        await otpResult.save()

        cache.set(email,{username,email,password,dateOfBirth})
    
        logger.info('Code Otp has been send:' + otpCode),
        res.status(200).json({
            message:'Otp has been send',
            data : otpResult
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = {signUpController}