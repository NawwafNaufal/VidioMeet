const refreshToken = require('../Models/refreshToken')
const Users = require('../Models/SignUpDB')
const ResponseError = require("../Error/responseError")

const validateJwt = async (token) => {
    const result = await refreshToken.findOne(token)

    if(!result) {
        throw new ResponseError(401,'Refresh token tidak ada')
    }
    const getData = await Users.findById(result.userId)

    if(!getData){
        throw new ResponseError(400,"User id tidak ada")
    }

    return getData
}

module.exports = validateJwt