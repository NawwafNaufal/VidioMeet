const express = require('express')
const routes = express.Router()
const loginController = require('../Controllers/Auth/Login.controller')
const validateLogin = require('../Middleware/Validation/validateLogin')
const limitApi = require('../Middleware/RateLimit/rateLimitApi')

routes.post('/LogIn',limitApi,validateLogin,loginController)

module.exports = routes