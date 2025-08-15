const Users  = require('../Models/SignUpDB')
const bcrypt = require('bcrypt')
const ResponseError = require("../Error/responseError")

const validateLogIn = async (emailOrUsername,password) => {
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
        return getDataUser
}

module.exports = validateLogIn