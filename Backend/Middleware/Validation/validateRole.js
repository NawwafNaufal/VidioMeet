const jwt = require('jsonwebtoken')
require('dotenv').config()
const ResponseError = require("../Error/responseError")

const roleValidate = (roleApp) => {
        return (req,res,next) => {
            const token = req.result

            if(!token){
                throw new ResponseError (401,'Token is required')
            }
            const {role} = token
            if(!roleApp.includes(role)){
                throw new ResponseError(403,'Access not permitted')
            }
            next()
        }
}

module.exports = roleValidate