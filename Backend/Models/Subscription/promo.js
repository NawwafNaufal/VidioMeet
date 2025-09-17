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
    redeemCode : {
        type : String,
        unique : true,
        sparse : true,
        default : undefined
    },
    startDate : {
        type : Date,
        required : true,
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
    },
    isHidden : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const promoPremium = mongoose.model("promo",promo,"promo")

module.exports = promoPremium