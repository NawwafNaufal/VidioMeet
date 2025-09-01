const routes  = require("../Utils/Server/route")
const loginController = require("../Controllers/Auth/loginUser")
const validateLogin = require('../Middleware/Validation/validateLogin')
const limitApi = require('../Middleware/RateLimit/rateLimitApi')

routes.post('/login',limitApi,validateLogin,loginController)

module.exports = routes