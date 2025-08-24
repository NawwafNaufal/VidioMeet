const express = require('express')
const routes = express.Router()
const forgetPasswordControl = require("../Controllers/Password/resetPassword")
const verifJwtChangePassword = require('../Middleware/Auth/jwtChangePassword')
const verifOtp = require('../Controllers/Password/verifOtpChangePassword')
const changePasssword = require('../Controllers/Password/changePassword')
const limitApi = require("../Middleware/RateLimit/rateLimitApi")
const validateChangePassword = require("../Middleware/Validation/validateChangePassword")
const resetPasswordValidate = require("../Middleware/Validation/validateResetPassword")
const valiOtp = require("../Middleware/Validation/validateOtp")

routes.post('/',limitApi,resetPasswordValidate,forgetPasswordControl)
routes.post('/verif-otp',limitApi,valiOtp,verifOtp)
routes.patch('/reset-password',limitApi,verifJwtChangePassword,validateChangePassword,changePasssword)

module.exports = routes