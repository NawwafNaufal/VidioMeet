const Users = require('../../Models/SignUpDB')
const logger = require('../../log/Winston')
const otp = require('../../Models/OtpCodeDb')
const cache = require('../../Utils/Cache/cache')
const {otpValidate} = require('../../Services/ValidateOtpdb')

const verifOtp = async (req,res) => {
    const {code,email} = req.valiOtp

    try {
        const otpData = await otpValidate(code)

        await otp.deleteOne({
            _id : otpData._id
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

        logger.info(`Registrasi Succes. Username: ${getData.username}. Email: ${getData.email},`)
        res.status(200).json({
            message:"Registrasi Succes",
            data:{
                username :getData.username,
                email : getData.email,
                dateOfBirth : getData.dateOfBirth,
            }
        })
        
    } catch (error) {
        if(error.message){
            logger.warn(error.message)
            return res.status(400).json({
                message : error.message
            })
        }
        logger.error(`Internal server error ${error.message} ${error.stack}`)
        return res.status(500).json(`Internal server error`)
    }
}

module.exports = verifOtp