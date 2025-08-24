const express = require("express")
const route = express.Router()
const userNotificationsContrroller = require("../../Controllers/Notifications/userNotifications")
const jwtValidate = require("../../Middleware/Auth/jwtValidate")

route.get("/notifications",jwtValidate,userNotificationsContrroller)

module.exports = route