const Users = require('../Models/SignUpDB')
const ResponseError = require("../Error/responseError")

const valiSignup =async (username,email) => {
    const emailVerif =await Users.findOne({email})
    const usernameVerif =await Users.findOne({username})

    if(emailVerif) {
        throw new ResponseError(400,'Email already exists')
    }

    if(usernameVerif) {
        throw new ResponseError(400,'Username already exists')
    }
}

module.exports = valiSignup