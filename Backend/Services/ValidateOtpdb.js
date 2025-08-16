const otp = require('../Models/OtpCodeDb')
const ResponseError = require("../Error/responseError")
const Users = require('../Models/SignUpDB')
const cache = require('../Utils/Cache/cache')

const otpValidate = async (code,email) => {
    
    const verifyOtp = await otp.findOne({code})
    if(!verifyOtp){
        throw new ResponseError(400,'Code is not valid')
    }
    
    const dateNow = new Date()
    if(dateNow > verifyOtp.expiresAt){
        throw new ResponseError(400,'Code otp is Expired')
    }
    
    await otp.deleteOne({
        _id : verifyOtp._id
    })

    const getData = cache.get(email)
    
    const result = new Users ({
            username :getData.username,
            email : getData.email,
            password : getData.password,
            dateOfBirth : getData.dateOfBirth,
    })
        await result.save()
    
        cache.del(email)

    return getData

}

module.exports = {otpValidate}