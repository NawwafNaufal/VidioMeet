const cloudinary = require("../../Config/cloudinary")
const fs = require('fs')

const fileUploadService =async (filePath) => {
    
    const result = await cloudinary.uploader.upload(filePath,{
        folder : "fileUser",
        resource_type : "auto"
    })

    fs.unlinkSync(filePath)
    return result
}  

module.exports = fileUploadService
