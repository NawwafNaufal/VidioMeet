const Users = require("../../Models/SignUpDB")
const refreshToken = require("../../Models/refreshToken")
const ResponseError =require("../../Error/responseError")

const logOutService =async (req) => {
    const token = req.result

    if(!token) {
        throw new ResponseError(400,"Access token required")
    }

    const {email} = token

    const getEmail = await Users.findOne({email})

    if(!getEmail){
        throw new ResponseError(400,"email not found")
    }

    await refreshToken.deleteMany({
        userId : getEmail._id
    })
    return getEmail
}

module.exports = logOutService