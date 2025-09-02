const Mongoose = require("mongoose")

const transactionDb = new Mongoose.Schema({
    transactionNumber : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['pending','success','failed','canceled'],
        required : true
    },
    paymentMethod : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    userId : {
        type : Mongoose.Schema.ObjectId,
        ref : "User"
    },
    premiumId : {
        type : Mongoose.Schema.ObjectId,
        ref : "premium"
    }
})

const transaction = Mongoose.model("transaction",transactionDb,"transaction")

module.exports = transaction