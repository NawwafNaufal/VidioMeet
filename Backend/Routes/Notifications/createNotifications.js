const express = require("express")
const route = express.Router()
const notificationsContrroler = require("../../Controllers/Notifications/createNotificationsA")
const validateNotifications = require("../../Middleware/Validation/validateNotifications")

route.post("/notifications/:userId",validateNotifications,notificationsContrroler)

module.exports = route