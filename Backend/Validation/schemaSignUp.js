const Joi = require('joi')

const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(15)
            .required()
            .messages({
                'string.min' : 'Minimal 3 Character',
                'string.max' : 'Maximal 15 Character',
                'string.empty' : 'Colum not be empty',
                'any.required' : 'the Username column must be filled in '
            }),
        email:Joi.string()
            .email()
            .required()
            .messages({
                'string.email' : 'format email is wwrong',
                'string.empty' : 'Colum not be empty',
                'any.required' : 'the Email column must be filled in '
            }),
        password:Joi.string()
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{8,15}$'))
            .messages({
                'string.empty' : 'Colum not be empty',
                'any.required' : 'the Password column must be filled in ',
                'string.pattern.base' : 'Passwords can only contain letters and numbers and minimum 8 words'
            }),
        dateOfBirth:Joi.date()
            .required()
            .messages({
                'string.empty' : 'Colum not be empty',
                'any.required' : 'the dateOfBirth column must be filled in '
            }),
})  

module.exports = schema