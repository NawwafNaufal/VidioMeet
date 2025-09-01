const routes = require("../../Utils/Server/route")
const promoController = require("../../Controllers/Subscription/promo")
const patchPromoController = require("../../Controllers/Subscription/patchPromo")

routes.post("/promo",promoController)
routes.patch("/promo/:id",patchPromoController)


module.exports = routes