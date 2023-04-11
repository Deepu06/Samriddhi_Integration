const BuyOrdersAggregation = require("../models/BuyOrdersAggregationModel");
const BuyOrders = require("../models/BuyOrderModel");
const BuyingCircleMembers = require("../models/BuyingCircleMembersModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1- Aggregation of a single type product, for multiple users.. i/p - array of buyOrders id..
// here there is aggregation happens only for one type of product at once

exports.createAggregation = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);
    const Order = new BuyOrdersAggregation()
    const products = req.body.id
    const order0 = await BuyOrders.findById(products[0])
    // console.log(order);
    Order.circle = order0.circle
    Order.buyingcircle = order0.circleId
    Order.product = order0.product.name
    Order.category = order0.product.category
    Order.price = req.body.price
    let totalQuantity = 0
    // console.log(Order);
    // console.log(products);


    async function fun() {
        let counter = products.length
        await new Promise(async (resolve, reject) => {
            (products.forEach(async (element) => {

                // console.log(element);
                const order = await BuyOrders.findById(element)
                if (!order || order0.product.name != order.product.name || order0.product.category != order.product.category) {
                    return reject("Error!!, All products should be off same catgeroy to aggregate!")
                }
                // console.log(order);
                // console.log(order0.product.name, order.product.name, order0.product.category , order.product.category);
                totalQuantity += order.product.quantity
                const obj = {
                    name: order.buyer,
                    reference: order._id,
                    price: req.body.price,
                    qunatity: order.product.quantity,
                    totalprice: order.product.quantity * req.body.price,
                }
                Order.users.push(obj)
                // console.log(obj);
                --counter
                // condition to resolve promise i.e if all the user details are updated in user arrray only then resolve and save ORDER document
                if (counter == 0) return resolve("success")
            })
            )
        })
    }

    // to synchronize the ORDER document properly..
    fun().then(async () => {
        Order.quantity = totalQuantity
        Order.totalprice = totalQuantity * req.body.price
        // console.log(Order);
        await Order.save()
        res.status(201).json({
            message: "Successfully aggregated",
            sucess: true,
            Order
        })
    }).catch((error) => {
        return next(new ErrorHandler(error))
    })
})

