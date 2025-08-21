const cloudinary = require('cloudinary').v2;
require("dotenv").config()

cloudinary.config({
    cloud_name : process.env.NAME_CLOUD,
    api_key : process.env.API_KEY_CLOUD,
    api_secret : process.env.SECRET_KEY_CLOUD 
})

module.exports = cloudinary