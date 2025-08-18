const Users = require("../../Models/SignUpDB")
const ResponseError = require("../../Error/responseError")

const updateRoleService = async (email,role) => {
    const getUser = await Users.findOne({email})

    if(!getUser) {
        throw new ResponseError(404,'User not found!')
    }

        await Users.updateOne(
            {email},
            { $set : {role}},
            {runValidators : true}
        )
    
}

module.exports = updateRoleService