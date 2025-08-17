const jwt = require("jsonwebtoken")
require('dotenv').config()
const ResponseError = require("../Error/errorMiddleware")

const validateJwt = (req,res,next) => {
        const token = req.cookies.accesToken

        if(!token) {
                throw new ResponseError(401,"Token is required")
            }
    
        jwt.verify(token,process.env.JWT_KEY,{
                issuer: 'auth-service',
                audience: 'user-service'
            }, (err,value) => {
        if(err){
            switch(err.name){
                case "TokenExpiredError":
                    return next(new ResponseError(401,'Token expired'))
                case "JsonWebTokenError":
                    return next(new ResponseError(403,'Invalid token'))
                case "NotBeforeError":
                    return next(new ResponseError(403,'Token not active yet'))
                default :
                    return next(new ResponseError(500,'internal token error'))
            }
        }
            req.result = value
            next()
        })
}

module.exports = validateJwt

