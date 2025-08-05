const schema = require('../../Validation/schemaSignUp')
const logger = require('../../log/Winston')
const bcrypt = require('bcrypt')

const fullNameValidate =async (req,res,next) => {
    const {error,value} = schema.validate(req.body)

    const hash =await bcrypt.hash(value.password,10)
    console.log(hash)

    if(error) {
        logger.warn(error.details[0].message)
        return res.status(400).json({
            message : error.details[0].message
        })
    }
    value.password = hash 
    
    req.fullNameValidate = value
    next()
}

module.exports = fullNameValidate

