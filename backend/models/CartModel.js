const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "BuyingCircleMember",
        unique: true,
        required: true
    },
    usercircle: {
        type: mongoose.Types.ObjectId,
        ref: "BuyingCircle",
        required: true
    },
    cartproducts: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            totalPrice: {
                type: Number,
                required: true
            }

        },
    ],
})

module.exports = mongoose.model("Cart", CartSchema)