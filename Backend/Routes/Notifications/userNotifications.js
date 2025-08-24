const express = require("express")
const route = express.Router()
const userNotificationsContrroller = require("../../Controllers/Notifications/userNotifications")
const jwtValidate = require("../../Middleware/Auth/jwtValidate")
const validateUserNotifications = require("../../Middleware/Validation/validateUserNotifications")

route.get("/notifications",jwtValidate,validateUserNotifications,userNotificationsContrroller)

module.exports = route