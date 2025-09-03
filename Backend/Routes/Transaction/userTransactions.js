const routes = require("../../Utils/Server/route")
const createTransactionController = require("../../Controllers/Transaction/createTransactions")
const notificationMidtransController = require("../../Controllers/Transaction/notificationTransaction")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

routes.post("/transaction",validateJwt,createTransactionController)
routes.post("/transaction/notification/",validateJwt,notificationMidtransController)

module.exports = routes