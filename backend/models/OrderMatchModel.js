const mongoose = require("mongoose");
const orderMatchSchema = new mongoose.Schema({
    order:{
        type:mongoose.Schema.ObjectId,
        ref:"BuyOrdersAggregation"
    },
    sale:{
        type:mongoose.Schema.ObjectId,
        ref:"Sale"
    },
    

}, { timestamps: true })
module.exports = mongoose.model("OrderMatch", orderMatchSchema)