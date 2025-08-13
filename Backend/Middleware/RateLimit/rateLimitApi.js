const {rateLimit} = require('express-rate-limit')

const limitApi = rateLimit ({
                windoMs : 1 * 60 * 1000,
                max : 5,
                standardHeaders :true,
                legacyHeaders : false,
                message : {
                        statut: 249,
                        message:"Request to many, please try again later"
                } 
        }) 

module.exports = limitApi