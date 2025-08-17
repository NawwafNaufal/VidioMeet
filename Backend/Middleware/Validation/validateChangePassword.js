const schemaChangePassword = require("../../Validation/schemaChagePassword")
const bcrypt = require("bcrypt")

const validateChangePassword =async (req,res,next) => {
    const {error,value} = schemaChangePassword.validate(req.body)

    const hashing = await  bcrypt.hash(value.password,10)

    if(error){
        return next(error)
    }

    value.password = hashing

    req.chagePassword = value
    next()
}

module.exports = validateChangePassword