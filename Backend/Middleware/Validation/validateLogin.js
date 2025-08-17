const schemaLogIn = require('../../Validation/schemaLogin')

const validateLogin = (req,res,next) => {
    const {error,value} = schemaLogIn.validate(req.body)

    if(error){
        return next(error)
    }

    req.validateLogin = value
    next()
}

module.exports = validateLogin