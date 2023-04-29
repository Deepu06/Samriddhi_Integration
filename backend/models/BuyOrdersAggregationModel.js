const mongoose = require("mongoose");
const buyOrdersAggregationSchema = new mongoose.Schema({
    circle: {
        type: String,
        required: true
    },
    buyingcircle: {
        type: mongoose.Schema.ObjectId,
        ref: "BuyingCircle",
        required: true
    },
    product: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    users: [
        {
            name: {
                type: String,
                required: true
            },
            reference: {
                type: mongoose.Schema.ObjectId,
                ref: "BuyingCirlceMembers"
            },
            price: {
                type: Number,
                required: true
            },
            totalprice: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            buyorderid: {
                type: mongoose.Schema.ObjectId,
                ref: "BuyOrder"
            }
        }
    ]
    , isDelivered: {
        type: Boolean,
        default: false,
        required: true
    }

}, { timestamps: true })
module.exports = mongoose.model("BuyOrdersAggregation", buyOrdersAggregationSchema)