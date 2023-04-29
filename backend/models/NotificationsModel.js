const mongoose = require("mongoose")
const NotificationsSchema = new mongoose.Schema({
    "seller": {
        type: mongoose.Schema.ObjectId,
        ref: "SellingCircleMembers",
        required: true,
    },
    "buyer": {
        type: mongoose.Schema.ObjectId,
        ref: "BuyingCircleMembers",
    },
    "transporter": {
        type: mongoose.Schema.ObjectId,
        ref: "TransportCircleMembers",
    },
    "order": {
        type: mongoose.Schema.ObjectId,
        ref: "OrderMatch",
        required: true,
    },
    "type": {
        type: String,
        required: true
    },
    "isSelected": {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Notifications", NotificationsSchema)