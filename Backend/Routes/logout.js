const express = require("express")
const route = express.Router()
const logOutControler = require("../Controllers/Auth/logout")
const validateJwt = require("../Middleware/Auth/jwtValidate")

route.post("/logout",validateJwt,logOutControler)


module.exports = route