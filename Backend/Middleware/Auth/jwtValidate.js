const jwt = require("jsonwebtoken")
require('dotenv').config()

const validateJwt = (req,res,next) => {
        const token = req.cookies.accesToken
    
        jwt.verify(token,process.env.JWT_KEY,{
                issuer: 'auth-service',
                audience: 'user-service'
            }, (err,value) => {
        if(err){
            switch(err.name){
                case "TokenExpiredError":
                    return res.status(401).json({message : 'Token expired'})
                case "JsonWebTokenError":
                    return res.status(403).json({message : 'Invalid token'})
                case "NotBeforeError":
                    return res.status(403).json({message : 'Token not active yet'})
                default :
                    return res.status(500).json({message : 'internal token error'})
            }
        }
            req.result = value
            next()
        })
}

module.exports = validateJwt