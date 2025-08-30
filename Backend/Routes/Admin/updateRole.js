const routes  = require("../../Utils/Server/route")
const updateRoleController = require("../../Controllers/Admin/updateRole")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

routes.patch("/update-role",validateJwt,updateRoleController)


module.exports = routes