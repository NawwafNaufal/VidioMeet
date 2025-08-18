const chagePasswordService = require("../../Services/chagePassword.service")
const {cookieAccesToken} = require("../../Utils/Cookie/cookieOptions")

const changePasssword = async (req,res,next) => {
    const {email,password} = req.chagePassword

    try {
        await chagePasswordService(email,password)
    
        res.clearCookie("changePasswordToken",cookieAccesToken)
    
        res.status(200).json({
            message : "Password has been changed"
        }) 
    } catch (error) {
        return next(error) 
    }

}

module.exports = changePasssword