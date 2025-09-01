const promoController = require("../../Controllers/Subscription/promo")
const routes = require("../../Utils/Server")

routes.post("/promo",promoController)


module.exports = routes