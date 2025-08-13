const Joi = require('joi')

const schemaLogIn = Joi.object({
                    username: Joi.string()
                        .min(3)
                        .max(45)
                        .messages({
                            'string.min' : 'Minimal 3 Character',
                            'string.max' : 'Maximal 8 Character',
                            'string.empty' : 'Column not be empty',
                        }),
                    email:Joi.string()
                        .email()
                        .messages({
                            'string.email' : 'format email is wwrong',
                            'string.empty' : 'Colum not be empty',
                        }),
                    password:Joi.string()
                                .required()
                                .pattern(new RegExp('^[a-zA-Z0-9]{8,15}$'))
                                .messages({
                                    'string.empty' : 'Colum not be empty',
                                    'any.required' : 'the Password column must be filled in ',
                                    'string.pattern.base' : 'Passwords can only contain letters and numbers and minimum 8 words'
                        })
}).or('username','email')

module.exports = schemaLogIn