require('dotenv').config()
const resetPasswordService = require("../../Services/resetPassword.service")
const logger = require("../../log/Winston")

const forgetPasswordControl =async (req,res,next) => {
    const {email} = req.resetPassword

    try {
        const result = await resetPasswordService(email)
        
        logger.info(`Code otp has been send ${email}`)
        res.status(200).json({
            message :"Code otp has been send",
            data: result
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = forgetPasswordControl