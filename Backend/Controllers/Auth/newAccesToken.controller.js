const jwt = require('jsonwebtoken')
require('dotenv').config()
const {cookieAccesToken} = require('../../Utils/Cookie/cookieOptions')
const {jwtOption} = require('../../Utils/Token/jwtOption')
const validateJwt = require('../../Services/validateJwt')
const logger = require('../../log/Winston')

const getNewAccesToken =async (req,res,next) => {
    const token = req.jwt
    try {
        const getData =await validateJwt(token)

        const payload = {
            _id : getData._id,
            username : getData.username,
            email : getData.email,
            dateOfBirth : getData.dateOfBirth,
            role : getData.role
        }
    
        const newAccesToken = jwt.sign(payload,process.env.JWT_KEY,jwtOption)
    
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