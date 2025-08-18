const express = require('express')
const routes = express.Router()
const getUsersController = require('../Controllers/Admin/getUsers.controller')
const validateJwt = require("../Middleware/Auth/jwtValidate")

routes.get('/get-users',validateJwt,getUsersController)

module.exports = routes