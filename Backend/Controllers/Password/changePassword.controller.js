const chagePasswordService = require("../../Services/chagePassword.service")
const {cookieAccesToken} = require("../../Utils/Cookie/cookieOptions")

const changePasssword = async (req,res) => {
    const {email,password} = req.chagePassword

    await chagePasswordService(email,password)

    res.clearCookie("changePasswordToken",cookieAccesToken)

    res.status(200).json({
        message : "Password has been changed"
    })
}

module.exports = changePasssword