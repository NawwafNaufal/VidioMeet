const express = require("express")
const route = express.Router()
const updateRoleController = require("../../Controllers/Admin/updateRole.controller")

route.patch("/update-role",updateRoleController)


module.exports = route