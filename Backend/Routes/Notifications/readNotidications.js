const routes  = require("../../Utils/Server/route")
const readNotifController = require("../../Controllers/Notifications/readNotifications")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

routes.post("/read-notification/:notificationId",validateJwt,readNotifController)

module.exports = routes