const otp = require('../../Models/OtpCodeDb')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cache = require("../../Utils/Cache/cache")
const ResponseError = require("../../Error/responseError")

const changePassword = async (code,email) => {
    const resultOtp = await otp.findOne({code})
    
        if(!resultOtp) {
            throw new ResponseError(400,'Code otp is not valid')
        }
    
        const getData = cache.get(email)
        
        if(!getData){
            throw new ResponseError(400,"Email tidak ada")
        }
    
        const token = jwt.sign({type : 'Token Change Password'},process.env.JWT_KEY,{expiresIn : '1m'})
    
        return token
}

module.exports = changePassword