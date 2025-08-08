const Users = require('../../Models/SignUpDB')
const bcrypt = require('bcrypt')

const changePasssword = async (req,res) => {
    const {email,password} = req.body

    const hashing =await  bcrypt.hash(password,10)

    await Users.updateOne(
        {email},
        {$set : {password : hashing}}
    ) 
    res.status(200).json("Kata sandi telah di ganti")
}

module.exports = changePasssword