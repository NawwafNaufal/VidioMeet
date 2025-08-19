const getUsersService = require("../../Services/Admin/getUsers.service")

const getUsersController = async (req,res,next) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const filterRole = req.query.role
        const filterCreatedAt = req.query.created
        const filterDateOfBirth = req.query.dob
    try {
        
        const {total,getUser} = await getUsersService(page,limit,filterRole,
                                        filterCreatedAt,filterDateOfBirth)

        res.status(200).json({
            page,
            limit,
            role : filterRole || "All",
            createdAt : filterCreatedAt || "All",
            totalPage : Math.ceil(total / limit),
            totaldata : total,
            data : getUser
        })
    } catch (error) {
        return next(error)
    }
    
}

module.exports = getUsersController