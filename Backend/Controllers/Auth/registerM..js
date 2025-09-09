const valiSignup = require('../../Services/ValidateSignUp')
const logger = require('../../log/Winston')

const signUpController = async (req,res,next) => {
    console.log('=== DEBUG CONTROLLER ===')
    console.log('req.body:', req.body)
    console.log('req.headers:', req.headers)
    console.log('========================')
    const {username,email,password,dateOfBirth} = req.body
    console.log(username,email,password,dateOfBirth)

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

module.exports = signUpController