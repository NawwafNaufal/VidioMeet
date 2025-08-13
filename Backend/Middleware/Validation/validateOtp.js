const schema = require('../../Validation/schemaOtp')

const valiOtp = (req,res,next) => {
    const {error,value} = schema.validate(req.body)

    if(error){
        return res.status(400).json({
            message : error.details[0].message
        })
    }

    req.valiOtp = value
    next()

}

module.exports = valiOtp