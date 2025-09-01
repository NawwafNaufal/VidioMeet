const premiumPlanController = require("../../Controllers/Subscription/premiumPlan")
const routes = require("../../Utils/Server/route")

routes.post("/premiup-plan",premiumPlanController)

module.exports = routes