const  jwt = require('jsonwebtoken')
require('dotenv').config()
const validateLogInService = require('../../Services/ValidateLogIn')
const logger = require('../../log/Winston')
const {cookieAccesToken,cookieRefreshToken} = require("../../Utils/Cookie/cookieOptions")

const loginController = async (req,res,next) => {
    const {username,email,password} = req.validateLogin

    try {
        const {getDataUser,accesToken,refToken} = await validateLogInService(username || email,password)

        res.cookie('accesToken',accesToken,cookieAccesToken)
        res.cookie('refreshToken',refToken,cookieRefreshToken)

        logger.info(`Login Succes: ${getDataUser.username}` )
        res.status(200).json({
            message : "Login Succes",
            data : {
                accesToken,
                refToken
            }
        })
    } catch (error) {
        next(error)
    }

}
module.exports = loginController