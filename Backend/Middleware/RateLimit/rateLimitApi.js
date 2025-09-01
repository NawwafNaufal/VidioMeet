const {rateLimit} = require('express-rate-limit')

const limitApi = rateLimit ({
                windowMs : 1 * 60 * 1000,
                max : 5,
                standardHeaders :true,
                legacyHeaders : false,
                // keyGenerator : (req,res) => {
                //         return req.result?._id || req.ip
                // },
                message : {
                        statut: 429,
                        message:"Request to many, please try again later"
                } 
        }) 

module.exports = limitApi