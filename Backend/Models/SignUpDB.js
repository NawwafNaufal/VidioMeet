const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
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
    subscription : {
        premiumPlaId : {
            type : Mongoose.Schema.ObjectId,
            ref : "premium",
            default : null
        },
        startDate : {
            type : Date,
            default : null
        },
        endDate : {
            type : Date,
            default : null
        }
    }
},{timestamps : true})

const Users = Mongoose.model("User",UserSchema,'User')

module.exports = Users