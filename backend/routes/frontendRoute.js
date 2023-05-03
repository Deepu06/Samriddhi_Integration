const express = require("express");
const Path = require("path")
const router = express.Router();

router.route("/").get((req, res) => {
    // console.log("in sales");

    let path = process.cwd()
    // console.log(path);
    // res.send(path)
    path = Path.join(path, "frontend", "index.html")
    res.sendFile(path)
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






router.route("/sales").get((req, res) => {
    // console.log("in sales");

    let path = process.cwd()
    // console.log(path);
    // res.send(path)
    path = Path.join(path, "frontend", "static", "sales.html")
    res.sendFile(path)
})
router.route("/orders").get((req, res) => {
    // console.log("in orders");
    let path = process.cwd()
    // console.log(path);
    // res.send(path)
    path = Path.join(path, "frontend", "static", "orders.html")
    res.sendFile(path)
})
router.route("/circles").get((req, res) => {
    // console.log("in circles");

    let path = process.cwd()
    // console.log(path);
    // res.send(path)
    path = Path.join(path, "frontend", "static", "circles.html")
    res.sendFile(path)
})













module.exports = router;