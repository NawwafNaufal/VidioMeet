const express = require("express")
const routes = express.Router()

const promoController = require("../../Controllers/Subscription/promo")
const patchPromoController = require("../../Controllers/Subscription/patchPromo")
const deletePromoController = require("../../Controllers/Subscription/deletePromo")

routes.post("/promo",promoController)
routes.patch("/promo/:id",patchPromoController)
routes.delete("/promo/:id",deletePromoController)


module.exports = routes