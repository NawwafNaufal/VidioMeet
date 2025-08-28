const express = require("express")
const route = express.Router()
const getNotificationsService = require("../../Controllers/Notifications/getNotifications")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

route.get("/get-notif",validateJwt,getNotificationsService)

module.exports = route