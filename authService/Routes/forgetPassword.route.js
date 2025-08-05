const express = require('express')
const routes = express.Router()
const forgetPasswordControl = require("../Controllers/Password/forgertPassword.controller")
const getNewAccesToken = require('../Controllers/Auth/newAccesToken.controller')
const verifJwtChangePassword = require('../Middleware/Auth/jwtChangePassword')
const verifOtp = require('../Controllers/Password/verifOtpChangePassword.controller')
const changePasssword = require('../Controllers/Password/changePassword.controller')
const validateNewAccesToken = require("../Middleware/Auth/jwtNewAccesToken")

routes.post('/forgetPassword',forgetPasswordControl)
routes.post('/verifOtp',verifOtp)
routes.get('/NewToken',validateNewAccesToken,getNewAccesToken)
routes.patch('/ChagePassword',verifJwtChangePassword,changePasssword)

module.exports = routes