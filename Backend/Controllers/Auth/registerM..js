const valiSignup = require('../../Services/ValidateSignUp')
const logger = require('../../log/Winston')

const signUpController = async (req,res,next) => {
    const {username,email,password,dateOfBirth} = req.fullNameValidate

    try {      
        const {otpCode,otpResult} =await valiSignup(username,email,password,dateOfBirth)  
        
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