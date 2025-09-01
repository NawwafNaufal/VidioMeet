const mongoose = require("mongoose")

const promo = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    discount : {
        type : Number,
        required : true
    },
    event : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    premiumPlanId : {
        type : mongoose.Schema.ObjectId,
        ref : "premium"
    }
})

const promoPremium = mongoose.model("promo",promo,"promo")

module.exports = promoPremium