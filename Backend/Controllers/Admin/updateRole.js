const updateRoleService =  require('../../Services/Admin/updateRole')

const updateRoleController = async (req,res,next) => {
    const {email,role} = req.body
    try {
        await updateRoleService(email,role)
    
        res.status(200).json({
            message : "Update role success",
            data : {
                email : email,
                role : role
            }    
        }) 
    } catch (error) {
        return next(error)
    }
}  

module.exports = updateRoleController