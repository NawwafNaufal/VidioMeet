const express = require("express")
const routes = express.Router()

const getNewAccesToken = require('../Controllers/Auth/newAccesToken')
const validateNewAccesToken = require("../Middleware/Auth/jwtNewAccesToken")

routes.get("/new-access-token",validateNewAccesToken,getNewAccesToken)

module.exports = routes