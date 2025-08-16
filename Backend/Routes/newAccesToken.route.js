const express = require("express")
const route = express.Router()
const getNewAccesToken = require('../Controllers/Auth/newAccesToken.controller')
const validateNewAccesToken = require("../Middleware/Auth/jwtNewAccesToken")

route.get("/new-access-token",validateNewAccesToken,getNewAccesToken)


module.exports = route