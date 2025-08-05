const  jwt = require('jsonwebtoken')
require('dotenv').config()
const validateLogIn = require('../../Services/ValidateLogIn')
const logger = require('../../log/Winston')
const refreshToken = require('../../Models/refreshToken')
const {cookieAccesToken,cookieRefreshToken} = require("../../Utils/Cookie/cookieOptions")
const {randomRefreshToken} = require('../../Utils/Token/randomString')
const {jwtOption} = require('../../Utils/Token/jwtOption')

const loginController = async (req,res) => {
    const {username,email,password} = req.validateLogin

    try {
        const emailOrUsername = username || email
    
        const getDataUser =  await validateLogIn(emailOrUsername,password)
    
        const payload = {
            _id : getDataUser._id,
            username : getDataUser.username,
            email : getDataUser.email,
            dateOfBirth : getDataUser.dateOfBirth,
            role : getDataUser.role
        }
        const accesToken = jwt.sign(payload,process.env.JWT_KEY,jwtOption)
        
            const refToken = new refreshToken({
                token: randomRefreshToken(),
                userId : payload._id,
                expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            })
            await refToken.save()

        res.cookie('accesToken',accesToken,cookieAccesToken)
        res.cookie('refreshToken',refToken,cookieRefreshToken)

        logger.info(`Login Succes: ${getDataUser.username}` )
        res.status(200).json({
            message : "Login Berhasil",
            data : {
                accesToken,
                refToken
            }
        })
    } catch (error) {
        if(error.message){
            logger.warn(error.message)
            return res.status(400).json({
                message : error.message
            })
        }
        logger.error(`Internal Server error ${error.message} ${error.stack}`)
        return res.status(500).json(`Internal Server error`)
    }

}
module.exports = loginController