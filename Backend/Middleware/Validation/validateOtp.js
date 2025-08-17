const schema = require('../../Validation/schemaOtp')

const valiOtp = (req,res,next) => {
    const {error,value} = schema.validate(req.body)

    if(error){
        return next(error)
    }

    req.valiOtp = value
    next()

}

module.exports = valiOtp