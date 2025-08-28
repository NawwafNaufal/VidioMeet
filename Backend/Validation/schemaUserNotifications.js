const Joi = require("joi")

const schemaUserNotifications = Joi.object({
                        category : Joi.string()
                                    .valid("transaction","news")
                                    .optional(),
                        isread : Joi.string()
                                    .valid("true","false")
                                    .optional()
})

module.exports = schemaUserNotifications