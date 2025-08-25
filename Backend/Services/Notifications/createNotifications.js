const notifications = require("../../Models/notifications")
const ResponseError = require("../../Error/responseError")
const Users = require("../../Models/SignUpDB")

const notificationsService = async (filter) => {

    const {id,title,detail,category} = filter

    if(id){
        const user = await Users.findOne({_id : id})
        if(!user){
            throw new ResponseError(404,'User is not found')
        }
    }else{

    const result = new notifications({
        title,
        detail,
        category,
        userId : id,
    })
    await result.save({runValidator : true})
    }

}

module.exports = notificationsService