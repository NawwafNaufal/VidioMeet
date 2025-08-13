const nodemailer = require('nodemailer')

const transports = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user : "nawwafnaufal03@gmail.com",
        pass : "hduu leaf fkiv rzym"
    }
})

module.exports  = transports