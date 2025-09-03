const routes = require("../../Utils/Server/route")
const createTransactionController = require("../../Controllers/Transaction/createTransactions")
const validateJwt = require("../../Middleware/Auth/jwtValidate")

routes.post("/payment-gatwat",validateJwt,createTransactionController)

module.exports = routes