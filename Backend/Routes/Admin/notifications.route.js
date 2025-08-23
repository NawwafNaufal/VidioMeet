const express = require("express")
const route = express.Router()
const notificationsContrroler = require("../../Controllers/Admin/notifications")
const validateNotifications = require("../../Middleware/Validation/validateNotifications")

route.post("/notifications/:userId",validateNotifications,notificationsContrroler)

module.exports = route