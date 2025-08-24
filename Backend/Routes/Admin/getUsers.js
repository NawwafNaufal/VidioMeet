const express = require('express')
const routes = express.Router()
const getUsersController = require('../../Controllers/Admin/getUsers')
const validateJwt = require("../../Middleware/Auth/jwtValidate")
const validateGetUsers  = require("../../Middleware/Validation/validateGetUsers")

routes.get('/get-users',validateJwt,validateGetUsers,getUsersController)

module.exports = routes