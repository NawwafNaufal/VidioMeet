const otp = require('../../Models/OtpCodeDb')
const jwt = require('jsonwebtoken')
const {cookieAccesToken} = require('../../Utils/Cookie/cookieOptions')
require('dotenv').config()
const cache = require("../../Utils/Cache/cache")

const verifOtp =async (req,res) => {
    const {code,email} = req.body

    const resultOtp = await otp.findOne(code)

    if(!resultOtp) {
        return res.status(400).json('Code otp is not valid')
    }

    const getData = cache.get(email)
    console.log(getData)
    if(!getData){
        return res.send("Email tidak ada")
    }

    const token = jwt.sign({type : 'Token Change Password'},process.env.JWT_KEY,{expiresIn : '1m'})

    res.cookie('changePasswordToken',token,cookieAccesToken)  

    res.status(200).json({
        message : "done",
        data : token
    })
}

module.exports = verifOtp