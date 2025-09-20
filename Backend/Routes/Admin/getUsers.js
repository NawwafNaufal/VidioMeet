const express = require("express")
const routes = express.Router()

const getUsersController = require('../../Controllers/Admin/getUsers')
const validateJwt = require("../../Middleware/Auth/jwtValidate")
const validateGetUsers  = require("../../Middleware/Validation/validateGetUsers")
const limitByJwt = require("../../Middleware/RateLimit/rateLimitByJwt")

routes.get('/get-users',validateJwt,limitByJwt,validateGetUsers,getUsersController)

module.exports = routes