const Users = require('../Models/SignUpDB')
const ResponseError = require("../Error/responseError")
const {randomOtp} = require('../Utils/Token/randomString')
const otp = require('../Models/OtpCodeDb')
const cache = require('../Utils/Cache/cache')
const emailSend = require('../Utils/Emails/emailSend')
const expiresAtTime = require('../Utils/Token/ExpiresAtTime')

const valiSignup =async (username,email,password,dateOfBirth) => {
    const emailVerif =await Users.findOne({email})
    const usernameVerif =await Users.findOne({username})

    if(emailVerif) {
        throw new ResponseError(400,'Email already exists')
    }

    if(usernameVerif) {
        throw new ResponseError(400,'Username already exists')
    }
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

        return {otpCode,otpResult}
}

module.exports = valiSignup