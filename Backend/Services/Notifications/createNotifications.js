const notifications = require("../../Models/notifications")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")

const notificationsService = async (id,title,detail,category) => {

    const branch = id ? {userId : id,title,detail,category} : {title,detail,category}

    if(id){
        const user = await Users.findOne({_id : id})
        if(!user){
            throw new ResponseError(404,'User is not found')
    }
    const userAll = new notifications(branch)
    await userAll.save({runValidator : true})
    }
}

module.exports = notificationsService