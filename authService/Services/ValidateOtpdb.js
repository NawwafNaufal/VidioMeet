const otp = require('../Models/OtpCodeDb')

const otpValidate = async (code) => {

    const verifyOtp = await otp.findOne({code})
    if(!verifyOtp){
        throw new Error('Code is not valid')
    }

    const dateNow = new Date()
    if(dateNow > verifyOtp.expiresAt){
        throw new Error('Code otp is Expired')
    }

    return verifyOtp

}

module.exports = {otpValidate}