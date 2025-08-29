const Users = require("../../Models/SignUpDB")

const getUsersService =async (page,limit,filterRole,filterCreatedAt,filterDateOfBirth) => {
        const filter = {}

        const skip = (page - 1) * limit

        if(filterRole){
            filter.role = filterRole
        }
        if(filterCreatedAt){
            const start = new Date(filterCreatedAt)
            const end = new Date(filterCreatedAt)
    
            end.setDate(end.getDate() + 1)
    
            const t = filter.createdAt = {$gte : start, $lt : end}
        }
        if(filterDateOfBirth){
            const convert = new Date(filterDateOfBirth)
            filter.dateOfBirth = convert
        }

        const getUser =await Users.find(filter)
        .limit(limit)
        .skip(skip)
        .sort({username : -1})

        const total = await Users.countDocuments(filter)

        return {total,getUser}
}

module.exports = getUsersService