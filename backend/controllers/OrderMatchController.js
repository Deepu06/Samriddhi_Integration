const BuyOrdersAggregation = require("../models/BuyOrdersAggregationModel");
const Sale = require("../models/SaleModel")
const OrderMatch = require("../models/OrderMatchModel")
const ConfirmOrder = require("../models/ConfirmOrderModel");
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

    if (order.category != sale.product.category || order.product != sale.product.name) {
        return next(new ErrorHandler("Order Mis-Match ,between order request and sale, they are off differnt category and product!"))
    }


    if (order.quantity < sale.product.minorder || order.price < sale.product.minprice) {
        return next(new ErrorHandler("Order Mis-Match There is either No minimum order match or price match between sale and order.."))
    }
    const newOrder = new OrderMatch()

    newOrder.sale = sale._id
    newOrder.order = order._id
    // console.log(order.users.length);
    // await newOrder.save()

    newOrder.users.push(sale.sellerId)

    async function fun() {
        let users = order.users
        let counter = users.length
        await new Promise(async (resolve, reject) => {
            (users.forEach(async (element) => {

                // console.log(element);
                newOrder.users.push(element.reference)
                counter--
                if (counter == 0) return resolve("success")
            })
            )
        })
    }

    fun().then(async () => {
        await newOrder.save()
    }).catch((error) => {
        return next(new ErrorHandler(error))
    })

    // sale.product.quantity -= order.quantity
    // await sale.save()

    const order_confirm = new ConfirmOrder()
    order_confirm.noofbuyers = order.users.length
    order_confirm.noofsellers = 1
    order_confirm.noofusers = order.users.length + 1
    order_confirm.order = newOrder._id
    await order_confirm.save()

    newOrder.confirmorder = order_confirm._id
    // await newOrder.save()

    res.status(201).json({
        "message": "order placed successfully",
        newOrder,
        order_confirm
    })
})

// 2- get all orders

exports.getOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await OrderMatch.find().populate("order").populate("sale")
    res.status(200).json({
        orders
    })
})

// 3- to confirm order match by a seller for finalising the order
// and finally the order is confirmed by both buyers and sellers then proceed to next phase of delivery
exports.confirmOrder = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const confirmorder = await ConfirmOrder.findOne({ order: id })
    // console.log(req.user._id);
    // console.log(confirmorder.users.includes(req.user._id));

    const name = req.user.name
    if (!confirmorder.users.includes(req.user._id)) {
        confirmorder.users.push(req.user._id)
        confirmorder.counter += 1
        await confirmorder.save()
        res.status(200).json({
            message: `Dear ${name} Order Confirmation from your side is sucessfully recorded`,
            success: true
        })
    } else {
        res.status(200).json({
            message: `Dear ${name} You have already confirmed your order`
        })
    }
})

// 4- to check if the order match is confirmes by all users i.e by both sellers and all buyers associated with that particular order
exports.isOrderConfirmed = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id
    const order = await ConfirmOrder.findOne({ order: id })
    // console.log(order);
    if (order.counter == order.noofusers && order.users.length == order.noofusers) {
        res.status(200).json({
            message: "This order is Sucessfully confirmed by all Sellers and Buyers associated with this sale."
        })
    }
    else {
        res.status(200).json({
            message: `This order is not yet confirmed by all users and , number of confirmed users - ${order.counter} , number of users yet to confirm - ${order.noofusers - order.counter}`
        })
    }
})
