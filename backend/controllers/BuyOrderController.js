const BuyOrder = require("../models/BuyOrderModel");
const BuyingCircleMembers = require("../models/BuyingCircleMembersModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// 1-creating a buyorder
exports.createBuyOrder = catchAsyncErrors(async (req, res, next) => {

    const user = await BuyingCircleMembers.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("No buyer found with this email-id!"))
    }


    const products = req.body.products

    async function fun() {
        let counter = products.length
        await new Promise(async (resolve, reject) => {
            (products.forEach(async (element) => {
                // console.log(element);
                const order = new BuyOrder()
                order.circleId = req.circle._id
                order.circle = req.circle.circlename
                order.circleemail = req.circle.circleemail
                order.buyerId = user._id
                order.buyer = user.name
                order.buyeremail = user.email
                order.product.name = element.name,
                    order.product.category = element.category,
                    order.product.minprice = element.minprice,
                    order.product.maxprice = element.maxprice,
                    order.product.quantity = element.quantity,
                    await order.save()
                --counter;
                // condition to resolve the promise i.e if all products are added successfully..
                if (counter == 0)
                    return resolve("success")
            }))
        })
    }
    fun().then(async () => {
        res.status(201).json({
            success: true,
        });
    }).catch((err) => {
        return next(new ErrorHandler(err));
    })
})

// 2- getting all current active buyorders..
exports.getAllOrders = catchAsyncErrors(async (req, res) => {
    const orders = await BuyOrder.find()
    res.status(200).json({
        success: true,
        orders
    })
})