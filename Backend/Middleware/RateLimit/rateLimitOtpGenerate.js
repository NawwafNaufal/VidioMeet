const {rateLimit} = require('express-rate-limit')

const limiterOtp = rateLimit ({
        windowMs : 60 * 1000,
        max : 1,
                standardHeaders :true,
                legacyHeaders : false,
                message : {
                        statut: 249,
                        message:"Request to many, please try again later"
                } 
})

module.exports = limiterOtp