const Users = require("../Models/SignUpDB")

const chagePasswordService =async (email,password) => {
    await Users.updateOne(
            {email},
            {$set : {password}}
        )     
}

module.exports = chagePasswordService