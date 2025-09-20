const schema = require('../../Validation/schemaSignUp')
const logger = require('../../log/Winston')
const bcrypt = require('bcrypt')

const fullNameValidate =async (req,res,next) => {
    const {error,value} = schema.validate(req.body)

    const hash = await bcrypt.hash(value.password,10)

    if(error) {
        return next(error)
    }
    value.password = hash 
    
    req.fullNameValidate = value
    next()
}

module.exports = fullNameValidate

