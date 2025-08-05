const fullNameValidate = require("../Middleware/Validation/validateSignUp")
const valiOtp = require("../Middleware/Validation/validateOtp")
const {signUpController} = require('../Controllers/Auth/RegisterM.controller')
const verifOtp = require('../Controllers/OTP/VerifOtp.controller')
const express = require('express')
const limitApi = require('../Middleware/RateLimit/rateLimitApi')
const randomNewOtp = require('../Controllers/OTP/generateNewOtp.controller')
const limiterOtp = require('../Middleware/RateLimit/rateLimitOtpGenerate')

const routes = express.Router()

routes.post('/Otp',limitApi,fullNameValidate,signUpController)
routes.post('/Verify',limitApi,valiOtp,verifOtp)
routes.post('/Otp/Generate',limiterOtp,randomNewOtp)

module.exports = routes
