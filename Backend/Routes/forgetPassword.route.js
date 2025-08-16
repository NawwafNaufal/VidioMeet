const express = require('express')
const routes = express.Router()
const forgetPasswordControl = require("../Controllers/Password/forgertPassword.controller")
const getNewAccesToken = require('../Controllers/Auth/newAccesToken.controller')
const verifJwtChangePassword = require('../Middleware/Auth/jwtChangePassword')
const verifOtp = require('../Controllers/Password/verifOtpChangePassword.controller')
const changePasssword = require('../Controllers/Password/changePassword.controller')
const validateNewAccesToken = require("../Middleware/Auth/jwtNewAccesToken")
const limitApi = require("../Middleware/RateLimit/rateLimitApi")

routes.post('/',forgetPasswordControl)
routes.post('/verif-otp',verifOtp)
routes.get('/new-acces-token',validateNewAccesToken,getNewAccesToken)
routes.patch('/reset-password',limitApi,verifJwtChangePassword,changePasssword)

module.exports = routes