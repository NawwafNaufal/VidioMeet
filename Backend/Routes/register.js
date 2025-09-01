const fullNameValidate = require("../Middleware/Validation/validateSignUp")
const valiOtp = require("../Middleware/Validation/validateOtp")
const {signUpController} = require('../Controllers/Auth/registerM.')
const verifOtp = require('../Controllers/OTP/verifOtp')
const routes  = require("../Utils/Server/route")
const limitApi = require('../Middleware/RateLimit/rateLimitApi')
const randomNewOtp = require('../Controllers/OTP/generateNewOtp')
const limiterOtp = require('../Middleware/RateLimit/rateLimitOtpGenerate')



routes.post('/',limitApi,fullNameValidate,signUpController)
routes.post('/verif-otp',limitApi,valiOtp,verifOtp)
routes.post('/new-otp',limiterOtp,randomNewOtp)

module.exports = routes
