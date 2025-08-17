const nodemailer = require('nodemailer')
require('dotenv').config()

const transports = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
})

module.exports  = transports