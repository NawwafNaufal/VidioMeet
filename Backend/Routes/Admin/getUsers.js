const routes  = require("../../Utils/Server/route")
const getUsersController = require('../../Controllers/Admin/getUsers')
const validateJwt = require("../../Middleware/Auth/jwtValidate")
const validateGetUsers  = require("../../Middleware/Validation/validateGetUsers")

routes.get('/get-users',validateJwt,validateGetUsers,getUsersController)

module.exports = routes