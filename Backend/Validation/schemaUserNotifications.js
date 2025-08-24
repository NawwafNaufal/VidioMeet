const Joi = require("joi")

const schemaUserNotifications = Joi.object({
                        category : Joi.string()
                                    .valid("transaction","news")
                                    .optional()
})

module.exports = schemaUserNotifications