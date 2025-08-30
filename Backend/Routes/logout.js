const routes  = require("../Utils/Server/route")
const logOutControler = require("../Controllers/Auth/logout")
const validateJwt = require("../Middleware/Auth/jwtValidate")

routes.post("/logout",validateJwt,logOutControler)


module.exports = routes