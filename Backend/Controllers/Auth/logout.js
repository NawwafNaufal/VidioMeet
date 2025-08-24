const logOutService = require("../../Services/Auth/logout")
const {cookieAccesToken,cookieRefreshToken} = require("../../Utils/Cookie/cookieOptions")
const logger = require("../../log/Winston")

const logOutControler = async (req,res,next) => {
    try {
        const result = await logOutService(req)
    
        res.clearCookie("accesToken",cookieAccesToken)
        res.clearCookie("refreshToken",cookieRefreshToken)

        logger.info(`logout success ${result.email}`)
        return res.status(200).json({
            message : "Logout Success",
            data: result.email
        })  
    } catch (error) {
        return next(error)
    }
}


module.exports = logOutControler