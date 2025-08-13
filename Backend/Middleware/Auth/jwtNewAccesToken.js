const validateNewAccesToken = (req,res,next) => {
    const token = req.cookies.refreshToken
    if(!token) {
        return res.status(403).json("Refresh Token is missing, plese back to login")
    }
    req.jwt = token
    next()
}

module.exports = validateNewAccesToken