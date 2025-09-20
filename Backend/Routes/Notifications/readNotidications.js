const express = require("express")
const routes = express.Router()

const readNotifController = require("../../Controllers/Notifications/readNotifications")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

routes.post("/read-notification/:notificationId",validateJwt,readNotifController)

module.exports = routes