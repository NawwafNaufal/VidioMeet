const routes  = require("../../Utils/Server/route")
const uploadFileController = require("../../Controllers/FIle/upload")

routes.post("/upload-file",uploadFileController)

module.exports = routes