const Mongoose = require('mongoose')

const UserScema = new Mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    role : {
        type: String,
        enum: ['admin','host','member'],
        default: 'member'
    }
})

const Users = Mongoose.model("User",UserScema,'User')

module.exports = Users