const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'Public')
    },
    filename : (req,file,cb) => {
        const time = new Date().getTime()
        const originalName = file.originalname
        cb (null,`${time} ${originalName}`)
    }
})

const upload = multer({
    storage : storage,
    limits : 100 * 1000 * 1000
})

module.exports = upload