const Users = require("../../Models/SignUpDB")
const logger = require('../../log/Winston')

const getUsersController =async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const filterRole = req.query.role

        //Validasi joi jika user input -1 atau 100000 auto reject

        const nameRole = ['admin','host','member']
        if(!nameRole.includes(filterRole)) {
            return res.status(400).json({message : "Invalid Role"})
        }

        const filter = filterRole && {role : filterRole}
        const skip = (page - 1) * limit
    
        const users = await Users.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({username : -1})
    
        const result =await Users.countDocuments(filter,{password : 0})

        const totalPages = result / limit
        
        if(page > totalPages) {
            return res.status(400).json({message : "No users found "})
        }
    
        res.status(200).json({
            page,
            limit,
            role : filterRole || 'All',
            totalpage : Math.ceil(totalPages),
            totaldata : result,
            data : users
        })   
    } catch (error) {
        logger.error(`${error.message} ${error.stack}`)
        return res.status(500).json({message : "Internal Server error"})
    }
    
}

module.exports = getUsersController