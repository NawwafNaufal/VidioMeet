const routes  = require("../../Utils/Server/route")
const notificationsContrroler = require("../../Controllers/Notifications/createNotificationsA")
const validateNotifications = require("../../Middleware/Validation/validateNotifications")

routes.post("/notifications",validateNotifications,notificationsContrroler)

module.exports = routes