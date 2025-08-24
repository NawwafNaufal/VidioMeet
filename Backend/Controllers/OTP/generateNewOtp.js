const randomNewOtpService = require("../../Services/randomNewOtp")

const randomNewOtp = async (req,res,next) => {

    try {
        const result =await randomNewOtpService()
    
        res.status(200).json({
            message : 'Otp has been send',
            data : result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = randomNewOtp

