const BuyOrdersAggregation = require("../models/BuyOrdersAggregationModel");
const Sale = require("../models/SaleModel")
const OrderMatch = require("../models/OrderMatchModel")
// const BuyOrders = require("../models/BuyOrderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1- Checking for order match of Aggregated order with sale for quantity and price match and place order and update sale cart qunatity
exports.orderMatch = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);
    const sale = await Sale.findById(req.body.sale)
    if (!sale) {
        return next(new ErrorHandler("There is no such sale exits!"))
    }
    const order = await BuyOrdersAggregation.findById(req.body.order)
    if (!order) {
        return next(new ErrorHandler("There is no such order exits!"))
    }
    // console.log(sale);
    // console.log(order);
    if (order.quantity < sale.product.minorder || order.price < sale.product.minprice) {
        return next(new ErrorHandler("There is either No minimum order match or price match between sale and order.."))
    }
    const newOrder = new OrderMatch()
    newOrder.sale = sale._id
    newOrder.order = order._id
    await newOrder.save()

    sale.product.quantity -= order.quantity
    await sale.save()

    res.status(201).json({
        "message": "order placed successfully",
        newOrder
    })
})

// 2- get all orders 

exports.getOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await OrderMatch.find()
    res.status(200).json({
        orders
    })
})