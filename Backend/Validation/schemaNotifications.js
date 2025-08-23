const Joi = require("joi")

const schemaNotifications = Joi.object({
                    title : Joi.string()
                            .required()
                            .min(6)
                            .max(50),
                    detail : Joi.string()
                            .required()
                            .min(10)
                            .max(500),
                    userId : Joi.string()
                            .length(24)    
                            .hex()            
})

module.exports = schemaNotifications