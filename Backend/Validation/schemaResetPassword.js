const Joi = require("joi")

const schemaResetPassword = Joi.object({
                        email : Joi.string()
                                    .email()
                                    .required()
                                    .messages({
                                    'string.email' : 'format email is wwrong',
                                    'string.empty' : 'Colum not be empty',
                                    'any.required' : 'the Email column must be filled in '
                                }),
})

module.exports = schemaResetPassword