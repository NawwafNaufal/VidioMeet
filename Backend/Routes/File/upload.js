const express = require("express")
const route = express.Router()
const uploadFileController = require("../../Controllers/FIle/upload")

route.post("/upload-file",uploadFileController)

module.exports = route