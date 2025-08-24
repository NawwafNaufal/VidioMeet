const logger = require('../../log/Winston')
const {otpValidate} = require('../../Services/ValidateOtpdb')

const verifOtp = async (req,res,next) => {
    const {code,email} = req.valiOtp

    try {
        const getData = await otpValidate(code,email)

        logger.info(`Registrasi Succes. Username: ${getData.username}. Email: ${getData.email},`)
        res.status(201).json({
            message:"Registrasi Succes",
            data:{
                username :getData.username,
                email : getData.email,
                dateOfBirth : getData.dateOfBirth,
            }
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = verifOtp