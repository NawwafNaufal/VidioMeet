const routes = require("../../Utils/Server/route")
const promoController = require("../../Controllers/Subscription/promo")
const patchPromoController = require("../../Controllers/Subscription/patchPromo")
const deletePromoController = require("../../Controllers/Subscription/deletePromo")

routes.post("/promo",promoController)
routes.patch("/promo/:id",patchPromoController)
routes.delete("/promo/:id",deletePromoController)


module.exports = routes