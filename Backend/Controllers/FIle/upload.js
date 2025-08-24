const fileUploadService = require("../../Services/File/upload")

const uploadFileController =async (req,res,next) => {
    const filePath = req.file.path
    try {
        const {result} = await fileUploadService(filePath)

        res.status(200).json({
            message : "Upload Success",
            data : result
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = uploadFileController