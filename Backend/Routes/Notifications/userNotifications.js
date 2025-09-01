const routes  = require("../../Utils/Server/route")
const userNotificationsContrroller = require("../../Controllers/Notifications/userNotifications")
const jwtValidate = require("../../Middleware/Auth/jwtValidate")
const validateUserNotifications = require("../../Middleware/Validation/validateUserNotifications")

routes.get("/notifications",jwtValidate,validateUserNotifications,userNotificationsContrroller)

module.exports = routes