const uploadFileController = (req,res,next) => {
    try {
        res.status(200).json({
            message : "Upload Success"
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = uploadFileController