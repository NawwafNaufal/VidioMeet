const express = require("express")
const route = express.Router()

const readNotifController = require("../../Controllers/Notifications/readNotifications")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

route.post("/read-notification/:notificationId",validateJwt,readNotifController)

module.exports = route