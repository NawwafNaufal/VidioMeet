const changePassword = require("../../Services/OTP/chagePassword.service")
const {cookieAccesToken} = require('../../Utils/Cookie/cookieOptions')

const verifOtp =async (req,res,next) => {
    const {code,email} = req.valiOtp
    try {
        const token  = await changePassword(code,email)

        res.cookie('changePasswordToken',token,cookieAccesToken)  
    
        res.status(200).json({
            message : "done",
            data : token
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = verifOtp