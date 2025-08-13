const schemaLogIn = require('../../Validation/schemaLogin')

const validateLogin = (req,res,next) => {
    const {error,value} = schemaLogIn.validate(req.body)

    if(error){
        return res.status(400).json({
            message : error.details[0].message
        })
    }

    req.validateLogin = value
    next()
}

module.exports = validateLogin