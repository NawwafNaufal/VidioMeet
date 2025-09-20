const express = require("express")
const routes = express.Router()

const uploadFileController = require("../../Controllers/FIle/upload")

routes.post("/upload-file",uploadFileController)

module.exports = routes