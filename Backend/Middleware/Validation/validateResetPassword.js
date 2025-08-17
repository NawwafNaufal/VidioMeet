const schemaResetPassword = require("../../Validation/schemaResetPassword")

const resetPasswordValidate = (req,res,next) => {
    const {error,value} = schemaResetPassword.validate(req.body)

    if(error){
        return next(error)
    }

    req.resetPassword = value
    next()
}

module.exports = resetPasswordValidate