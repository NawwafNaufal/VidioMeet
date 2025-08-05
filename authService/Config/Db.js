const mongoose = require("mongoose")
require('dotenv').config()
const logger = require('../log/Winston')

const mongooDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info("Connect In MongoDb")
    } catch (error) {
        logger.info(error.message + error.stack)
    }
}

module.exports = mongooDb