const Users  = require('../Models/SignUpDB')
const bcrypt = require('bcrypt')

const validateLogIn = async (emailOrUsername,password) => {
    const getDataUser = await Users.findOne({
            $or : [
                {username : emailOrUsername,},
                {email : emailOrUsername}
            ]
        })
        if(!getDataUser){
            throw new Error('Email or Username is not valid')
        }
        const validateHashing = await bcrypt.compare(password,getDataUser.password)
                if(!validateHashing) {
                    throw new Error("Wrong Password")
                    
                }
        return getDataUser
}

module.exports = validateLogIn