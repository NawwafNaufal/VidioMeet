const express = require('express')
const routes = express.Router()
const forgetPasswordControl = require("../Controllers/Password/forgertPassword.controller")
const getNewAccesToken = require('../Controllers/Auth/newAccesToken.controller')
const verifJwtChangePassword = require('../Middleware/Auth/jwtChangePassword')
const verifOtp = require('../Controllers/Password/verifOtpChangePassword.controller')
const changePasssword = require('../Controllers/Password/changePassword.controller')
const validateNewAccesToken = require("../Middleware/Auth/jwtNewAccesToken")
const limitApi = require("../Middleware/RateLimit/rateLimitApi")

routes.post('/forgetPassword',forgetPasswordControl)
routes.post('/verifOtp',verifOtp)
routes.get('/NewToken',validateNewAccesToken,getNewAccesToken)
routes.patch('/ChagePassword',limitApi,verifJwtChangePassword,changePasssword)

module.exports = routes