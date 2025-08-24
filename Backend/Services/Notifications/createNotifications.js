const notifications = require("../../Models/notifications")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")

const notificationsService = async (title,detail,category,userId) => {

    const user = await Users.findOne({_id : userId})

    if(!user){
        throw new ResponseError(404,'User is not found')
    }
    
    const result = new notifications({
        title,
        detail,
        category,
        userId,
    })

    await result.save({runValidator : true})
}

module.exports = notificationsService