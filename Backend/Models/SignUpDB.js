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
    address : {
        type : String
    },
    profilePicture : {
        type : String,
        default : " "
    },
    role : {
        type: String,
        enum: ['admin','host','member'],
        default: 'member'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Users = Mongoose.model("User",UserScema,'User')

module.exports = Users