const refreshToken = require('../Models/refreshToken')
const Users = require('../Models/SignUpDB')

const validateJwt = async (token) => {
    const result = await refreshToken.findOne(token)

    if(!result) {
        throw new Error('Refresh token tidak ada')
    }
    const getData = await Users.findById(result.userId)

    if(!getData){
        throw new Error("User id tidak ada")
    }

    return getData
}

module.exports = validateJwt