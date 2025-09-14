const express = require("express")
const routes = express.Router()

const updateRoleController = require("../../Controllers/Admin/updateRole")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

routes.patch("/update-role",validateJwt,updateRoleController)


module.exports = routes