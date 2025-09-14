const express = require("express")
const routes = express.Router()

const notificationsContrroler = require("../../Controllers/Notifications/createNotificationsA")
const validateNotifications = require("../../Middleware/Validation/validateNotifications")

routes.post("/notifications",validateNotifications,notificationsContrroler)

module.exports = routes