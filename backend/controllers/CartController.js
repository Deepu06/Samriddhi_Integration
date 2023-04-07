const Cart = require("../models/cartModel");
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Each and every User will have only one cart which will have an array of objects..

// 1- Create a Cart for an user
exports.createCart = catchAsyncErrors(async (req, res, next) => {
    // console.log("in creartte");
    const check = await Cart.findOne({ user: req.user._id });
    if (check) {
        return next(new ErrorHandler("cart already exists for this user, can't create a new one!"))
    }
    const cart = new Cart()
    cart.user = req.user._id
    cart.usercircle = req.user.circle
    await cart.save()
    res.status(201).json({
        success: true,
        cart
    })
    // Dealing with Array of products
    // const products = req.body.products
    // console.log(products);

    // inorder to first add all multiple products and then save cart -- achieved it using async fun() that returns a promise
    // async function fun() {
    //     let counter = products.length
    //     await new Promise(async (resolve, reject) => {
    //         (products.forEach(async (element) => {
    //             const product = await Product.findById(element.id)
    //             if (!product) {
    //                 // return next(new ErrorHandler("Wrong Product id,product does'nt exist!"))
    //                 // rejecting a promise
    //                 return reject("No such product")
    //             }
    //             const obj = {
    //                 product: product._id,
    //                 name: product.name,
    //                 price: product.price,
    //                 quantity: element.quantity,
    //                 totalPrice: product.price * element.quantity
    //             }
    //             cart.cartproducts.push(obj)
    //             --counter;
    //             // condition to resolve the promise i.e if all products are added successfully..
    //             if (counter == 0)
    //                 return resolve("success")
    //         }))
    //     })
    // }
    // fun().then(async () => {
    //     // console.log("resolved");
    //     console.log("out");
    //     console.log(cart);
    //     await cart.save()
    //     res.status(201).json({
    //         success: true,
    //         cart,
    //     });
    // }).catch((err) => {
    //     return next(new ErrorHandler(err));
    // })
})

// 2- Updating the cart i.e 
// exports.createCart = catchAsyncErrors(async (req, res, next) => {
//     const check = await Cart.findOne({ user: req.user._id });
//     if (check) {
//         return next(new ErrorHandler("cart already exists for this user, can't create a new one!"))
//     }
//     const cart = new Cart()
//     cart.user = req.user._id
//     cart.usercircle = req.user.circle

//     // Dealing with Array of products
//     const products = req.body.products
//     // console.log(products);

//     // inorder to first add all multiple products and then save cart -- achieved it using async fun() that returns a promise
//     async function fun() {
//         let counter = products.length
//         await new Promise(async (resolve, reject) => {
//             (products.forEach(async (element) => {
//                 const product = await Product.findById(element.id)
//                 if (!product) {
//                     // return next(new ErrorHandler("Wrong Product id,product does'nt exist!"))
//                     // rejecting a promise
//                     return reject("No such product")
//                 }
//                 const obj = {
//                     product: product._id,
//                     name: product.name,
//                     price: product.price,
//                     quantity: element.quantity,
//                     totalPrice: product.price * element.quantity
//                 }
//                 cart.cartproducts.push(obj)
//                 --counter;
//                 // condition to resolve the promise i.e if all products are added successfully..
//                 if (counter == 0)
//                     return resolve("success")
//             }))
//         })
//     }
//     fun().then(async () => {
//         // console.log("resolved");
//         // console.log("out");
//         await cart.save()
//         // console.log(cart);
//         res.status(201).json({
//             success: true,
//             cart,
//         });
//     }).catch((err) => {
//         return next(new ErrorHandler(err));
//     })
// })


// should work on this stuff!!
exports.updateCartAddItems = catchAsyncErrors(async (req, res, next) => {
    // const cart = await Cart.findById(req.params.id)
    // // cart.cartProducts.findOne({product:req.body.id})
    // // console.log();
    // // log(cart.cartproducts)
    // // console.log(cart.cartproducts);
    // let item = null;
    // cart.cartproducts.forEach(async (element) => {
    //     if (element.product == req.body.id)
    //         item = element
    //     console.log(element);
    //     cart.cartproducts.pull(element)
    // });
    // // await cart.save()
    // res.json(cart)

    const products = req.body.products
    console.log(products);

    // const cart = new Cart()
    const cart = await Cart.findOne({ user: req.user._id })
    // console.log("cart is -->");
    // console.log(cart);

    async function fun() {
        let counter = products.length
        await new Promise(async (resolve, reject) => {
            (products.forEach(async (element) => {
                const product = await Product.findById(element.id)
                // console.log(product);
                if (!product) {
                    // return next(new ErrorHandler("Wrong Product id,product does'nt exist!"))
                    // rejecting a promise
                    return reject("No such product")
                }
                console.log(element);
                const obj = {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: element.quantity,
                    totalPrice: product.price * element.quantity
                }
                // console.log(obj);
                cart.cartproducts.push(obj)
                --counter;
                // condition to resolve the promise i.e if all products are added successfully..
                if (counter == 0)
                    return resolve("success")
            }))
        })
    }
    fun().then(async () => {
        // console.log("resolved");
        // console.log("out");
        await cart.save()
        console.log(cart);
        res.status(201).json({
            success: true,
            cart,
        });
    }).catch((err) => {
        return next(new ErrorHandler(err));
    })

    // res.status(200).json({
    //     message: true
    // })
})