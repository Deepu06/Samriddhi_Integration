const express = require("express");
const Path = require("path")
const router = express.Router();


router.route("/").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "index.html")
    // console.log(path);
    res.sendFile(path)
    // console.log(path);
})

router.route("/selectCircles").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "selectCircles.html")
    res.sendFile(path)
})

router.route("/memberCircleSelection").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "memberCircleSelection.html")
    res.sendFile(path)
})


// Images Routing...

router.route("/background").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "background.jpg")
    res.sendFile(path)
})
router.route("/img_buyer").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "buyer.jpg")
    res.sendFile(path)
})
router.route("/img_seller").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "seller.png")
    res.sendFile(path)
})
router.route("/img_transport").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "img", "transport.png")
    res.sendFile(path)
})

// -------------------- Buying Circle admin ADMIN-------------------

router.route("/adminBuyerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "login.html")
    res.sendFile(path)
})
router.route("/adminBuyerRegister").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "Register.html")
    res.sendFile(path)
})

router.route("/adminBuyerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Buyer", "BuyingCircleDashboard.html")
    res.sendFile(path)
})

// -------------------- Selling Circle admin ADMIN-------------------

router.route("/adminSellerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "login.html")
    res.sendFile(path)
})
router.route("/adminSellerRegister").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "Register.html")
    res.sendFile(path)
})

router.route("/adminSellerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Admin", "Seller", "BuyingCircleDashboard.html")
    res.sendFile(path)
})



// ------------------MEMBERS-----------------

router.route("/memberBuyerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "login.html")
    res.sendFile(path)
})
router.route("/memberSellerLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "login.html")
    res.sendFile(path)
})
router.route("/memberTransportLogin").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "login.html")
    res.sendFile(path)
})

router.route("/BuyerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Buyer", "BuyerDashboard.html")
    res.sendFile(path)
})
router.route("/SellerDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Seller", "SellerDashboard.html")
    res.sendFile(path)
})
router.route("/TransportDashboard").get((req, res) => {
    let path = process.cwd()
    path = Path.join(path, "frontend", "Members", "Transport", "TransportDashboard.html")
    res.sendFile(path)
})












// router.route("/sales").get((req, res) => {
//     // console.log("in sales");

//     let path = process.cwd()
//     // console.log(path);
//     // res.send(path)
//     path = Path.join(path, "frontend", "static", "sales.html")
//     res.sendFile(path)
// })
// router.route("/orders").get((req, res) => {
//     // console.log("in orders");
//     let path = process.cwd()
//     // console.log(path);
//     // res.send(path)
//     path = Path.join(path, "frontend", "static", "orders.html")
//     res.sendFile(path)
// })
// router.route("/circles").get((req, res) => {
//     // console.log("in circles");

//     let path = process.cwd()
//     // console.log(path);
//     // res.send(path)
//     path = Path.join(path, "frontend", "static", "circles.html")
//     res.sendFile(path)
// })













module.exports = router;