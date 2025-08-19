const Joi = require("joi")

const schemaGetUsers = Joi.object({
                    page : Joi.number()
                            .integer()
                            .min(1)
                            .default(1),
                    limit : Joi.number()
                            .integer()
                            .min(1)
                            .max(100)
                            .default(20),
                    role : Joi.string()
                            .valid('admin','host','member')    
                            .optional(),
                    created : Joi.date()
                            .iso()
                            .optional(),
                    dob : Joi.date()
                            .iso()
                            .optional()
})

module.exports = schemaGetUsers