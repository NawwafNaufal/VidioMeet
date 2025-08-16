const Users  = require('../Models/SignUpDB')
const bcrypt = require('bcrypt')
const ResponseError = require("../Error/responseError")
const  jwt = require('jsonwebtoken')
require('dotenv').config()
const refreshToken = require('../Models/refreshToken')
const {randomRefreshToken} = require('../Utils/Token/randomString')
const {jwtOption} = require('../Utils/Token/jwtOption')

const validateLogInService = async (emailOrUsername,password) => {
    const getDataUser = await Users.findOne({
            $or : [
                {username : emailOrUsername,},
                {email : emailOrUsername}
            ]
        })
        if(!getDataUser){
            throw new ResponseError(404,'Email or Username is not valid')
        }
        const validateHashing = await bcrypt.compare(password,getDataUser.password)

        if(!validateHashing) {
            throw new ResponseError(401,"Wrong Password")
                    
        }
                        
        const payload = {
            _id : getDataUser._id,
            username : getDataUser.username,
            email : getDataUser.email,
            dateOfBirth : getDataUser.dateOfBirth,
            role : getDataUser.role
        }
            const accesToken = jwt.sign(payload,process.env.JWT_KEY,jwtOption)
                
            const refToken = new refreshToken({
                token: randomRefreshToken(),
                userId : payload._id,
                expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            })
            await refToken.save()
            
        return {getDataUser,accesToken,refToken}
}

module.exports = validateLogInService