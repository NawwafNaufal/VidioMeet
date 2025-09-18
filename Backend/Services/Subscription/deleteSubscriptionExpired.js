const {CronJob} = require("cron")
const User = require("../../Models/SignUpDB")
const logger = require("../../log/Winston")
const ResponseError = require("../../Error/responseError")

const deleteSubscriptionService = () => {     
    const job = new CronJob(
        '0 0 * * *',
        async function () {
            try {
                const date = new Date()
                    await User.updateMany(
                        {"subscription.endDate" : {$lt : date}},
                        {
                            $set : {
                                role : "member",
                                "subscription.premiumPlaId" : null,
                                "subscription.startDate" : null,
                                "subscription.endDate" : null,
                            }
                        }
                    )
                logger.info("Expired subscription sudah dihapus")
            } catch (error) {
                throw new ResponseError(400,"Cron Error")
            }
        },
        null,
        true,
        "Asia/Jakarta" 
    )
    return job
}

module.exports = deleteSubscriptionService

