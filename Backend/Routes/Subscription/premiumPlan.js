const express = require("express")
const routes = express.Router()

const premiumPlanController = require("../../Controllers/Subscription/premiumPlan")
const patchPremiumController = require("../../Controllers/Subscription/patchPremiumPlan")
const deletePremiumPlanController = require("../../Controllers/Subscription/deletePremiumPlan")

routes.post("/premiup-plan",premiumPlanController)
routes.patch("premiup-plan/:id",patchPremiumController)
routes.delete("premiup-plan/:id",deletePremiumPlanController)

module.exports = routes