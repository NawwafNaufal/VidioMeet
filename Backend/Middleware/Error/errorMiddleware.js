const ResponseError = require("../../Error/responseError")
const {ValidationError} = require('joi')
const logger = require("../../log/Winston")

const errorMiddleware = async (err,req,res,next) => {
    if (!err){
        next()
        return
    }

    if(err instanceof ResponseError) {
        logger.warn(`${err.message} ${err.stack}`)
        return res.status(err.status).json({
            errors : err.message
        })
    }
    else if(err instanceof ValidationError){
        logger.warn(`${err.message}`)
        return res.status(400).json({
            errors : err.message
        })
    }
    else {
        logger.error(err.message + err.stack)
        return res.status(500).json({
            errors : err.message
        })
    }
}

module.exports = errorMiddleware