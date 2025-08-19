const schemaGetUsers = require("../../Validation/schemaGetUsers")

const validateGetUsers = (req,res,next) => {
    const {error,value} = schemaGetUsers.validate(req.query)

    if(error){
        return next(error)
    }

    req.getUsers = value
    next()
}

module.exports = validateGetUsers