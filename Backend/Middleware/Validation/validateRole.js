const jwt = require('jsonwebtoken')
require('dotenv').config()

const roleValidate = (roleApp) => {
        return (req,res,next) => {
            const token = req.result
            console.log(token)
            if(!token){
                return res.status(401).json('Token di perlukan')
            }
            const {role} = token
            if(!roleApp.includes(role)){
                return res.status(403).json('Akses tidak di perbolehkan')
            }
            next()
        }
}

module.exports = roleValidate