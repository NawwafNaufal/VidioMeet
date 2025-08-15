const otp = require('../Models/OtpCodeDb')
const ResponseError = require("../Error/responseError")

const otpValidate = async (code) => {

    const verifyOtp = await otp.findOne({code})
    if(!verifyOtp){
        throw new ResponseError(400,'Code is not valid')
    }

    const dateNow = new Date()
    if(dateNow > verifyOtp.expiresAt){
        throw new ResponseError(400,'Code otp is Expired')
    }

    return verifyOtp

}

module.exports = {otpValidate}