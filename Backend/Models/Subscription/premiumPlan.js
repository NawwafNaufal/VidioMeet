const mongoose = require("mongoose")

const premiumPlan = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    price : {
        type: Number,
        required : true
    },
    duration : {
        type: Number,
        required: true
    }
})

const premium = mongoose.model("premium",premiumPlan,"premium") 

module.exports = premium
