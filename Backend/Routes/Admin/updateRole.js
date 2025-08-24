const express = require("express")
const route = express.Router()
const updateRoleController = require("../../Controllers/Admin/updateRole")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

route.patch("/update-role",validateJwt,updateRoleController)


module.exports = route