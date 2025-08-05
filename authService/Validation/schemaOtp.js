const Joi = require('joi')

const schema = Joi.object({
            code:Joi.string()
                    .required()
                    .min(6)
                    .max(6)
                    .messages({
                        'string.base' : 'OTP must be string',
                        'any.required' : 'Colum not be empty',
                        'string.min' : 'Minimal 6 Character',
                        'string.max' : 'Maximal 6 Character',
                    }),
            email:Joi.string()
                        .email()
                        .required()
                        .messages({
                            'string.email' : 'format email is wwrong',
                            'string.empty' : 'Colum not be empty',
                            'any.required' : 'the Email column must be filled in '
                        }),
})

module.exports = schema