const notifications = require("../../Models/notifications")
const ResponseError = require("../../Error/responseError")

const notificationsService = async (title,detail,category,userId) => {
    
    const result = new notifications({
        title,
        detail,
        category,
        userId,
    })

    await result.save({runValidator : true})
}

module.exports = notificationsService