const routes = require("../../Utils/Server/route")
const premiumPlanController = require("../../Controllers/Subscription/premiumPlan")
const patchPremiumController = require("../../Controllers/Subscription/patchPremiumPlan")

routes.post("/premiup-plan",premiumPlanController)
routes.patch("premiup-plan/:id",patchPremiumController)

module.exports = routes