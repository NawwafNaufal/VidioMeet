const randomstring = require('randomstring')

const randomOtp = () => {
    const randomString = randomstring.generate({
            length: 6,
            charset: 'numeric'
        })
        return randomString
}

const randomRefreshToken = () => {
    const token = randomstring.generate({
                length:100,
                charset:'alphanumeric'
        })
        return token
}

module.exports = {randomOtp,randomRefreshToken}