const Joi = require('joi')

const schemaChangePassword = Joi.object({
            email : Joi.string()
                .required()
                .email()
                .messages({
                            'string.email' : 'format email is wwrong',
                            'string.empty' : 'Colum not be empty',
                }),
            password : Joi.string()
                .required()
                .pattern(new RegExp('^[a-zA-Z0-9]{8,15}$'))
                .messages({
                                    'string.empty' : 'Colum not be empty',
                                    'any.required' : 'the Password column must be filled in ',
                                    'string.pattern.base' : 'Passwords can only contain letters and numbers and minimum 8 words'
                })
})

module.exports = schemaChangePassword
            