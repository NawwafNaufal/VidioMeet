const Users = require('../Models/SignUpDB')

const valiSignup =async (username,email) => {
    const emailVerif =await Users.findOne({email})
    const usernameVerif =await Users.findOne({username})

    if(emailVerif) {
        throw new Error('Email already exists')
    }

    if(usernameVerif) {
        throw new Error('Username already exists')
    }
}

module.exports = valiSignup