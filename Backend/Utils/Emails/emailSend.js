const transports = require('../Emails/nodeMailer')
const logger = require('../../log/Winston')
const {randomOtp} = require("../Token/randomString")
const htmlEmail = require('./EmailTamplate')

const emailSend = (username,email) => {
    const tamplateEmail = {
            from: 'VidioChat',
            to: email,
            subject: "Code Otp",
            html: htmlEmail(username,randomOtp()), 
        }
        
        transports.sendMail(tamplateEmail,(error,info) => {
            if(error){
                logger.warn("Code Otp failed send")
            }
            logger.info('Code Otp has been send')
        })
}

module.exports = emailSend