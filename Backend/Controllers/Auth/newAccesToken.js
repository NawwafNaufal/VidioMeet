const validateJwt = require('../../Services/validateJwt')
require('dotenv').config()
const {cookieAccesToken} = require('../../Utils/Cookie/cookieOptions')

const getNewAccesToken =async (req,res,next) => {
        const token = req.jwt
    try {
        const newAccesToken = await validateJwt(token)
    
        res.cookie('accesToken',newAccesToken,cookieAccesToken)
    
        res.status(200).json({
            message : 'new acces token generate',
            data : newAccesToken
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getNewAccesToken