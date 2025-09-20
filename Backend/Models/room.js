const Mongoose = require("mongoose")

const roomSchema = new Mongoose.Schema({
    roomId : {
        type : String,
        required : true,
        unique : true
    },
    participants : [
        {
            socketId : String,
            user : {
                id : String,
                name : String,
                email : String
            }
        }
    ]
})

const Room = Mongoose.model("room",roomSchema,"room")

module.exports = Room