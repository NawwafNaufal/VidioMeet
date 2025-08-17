const Users = require("../../Models/SignUpDB")
const logger = require('../../log/Winston')

const getUsersController =async (req,res,next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const filterRole = req.query.role

        const skip = (page - 1) * limit

        const result = filterRole && {role : filterRole} || {}

        const getUser =await Users.find(result)
        .limit(limit)
        .skip(skip)
        .sort({username : -1})

        const total = await Users.countDocuments(result)
        
        return res.status(200).json({
            page,
            limit,
            role : filterRole || "All",
            totalPage : Math.ceil(total / limit),
            totaldata : total,
            data : getUser
        })
    } catch (error) {
        return next(error)
    }
    
}

module.exports = getUsersController