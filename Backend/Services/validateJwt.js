const refreshToken = require('../Models/refreshToken')
const Users = require('../Models/SignUpDB')
const ResponseError = require("../Error/responseError")
const jwt = require('jsonwebtoken')
const {jwtOption} = require("../Utils/Token/jwtOption")
require('dotenv').config()

const validateJwt = async (token) => {
    const result = await refreshToken.findOne(token)

    if(!result) {
        throw new ResponseError(401,'Refresh token missing')
    }
    const getData = await Users.findById(result.userId)

    if(!getData){
        throw new ResponseError(400,"User ID does not exist")
    }    
            const payload = {
                _id : getData._id,
                username : getData.username,
                email : getData.email,
                dateOfBirth : getData.dateOfBirth,
                role : getData.role
            }
            const newAccesToken = jwt.sign(payload,process.env.JWT_KEY,jwtOption)

    return newAccesToken
}

module.exports = validateJwt