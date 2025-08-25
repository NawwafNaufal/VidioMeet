const Joi = require("joi")

const schemaNotifications = Joi.object({
                        title : Joi.string()
                                .required()
                                .min(3)
                                .max(50),
                        detail : Joi.string()
                                .required()
                                .min(10)
                                .max(500),
                        category: Joi.string()
                                .valid('news','transaction') 
                                .required(),
                        id : Joi.string()
                                .length(24)    
                                .hex()  
                                .optional()          
})

module.exports = schemaNotifications