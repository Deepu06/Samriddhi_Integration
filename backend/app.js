const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");


const dotenv = require("dotenv")
dotenv.config({ path: "backend/config/config.env" });

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports

const BuyingCircle = require("./routes/BuyingCirlceRoute");
const SellingCircle = require("./routes/SellingCircleRoute");
const TransportCircle = require("./routes/TransportCircleRoute")

app.use("/api/buyer", BuyingCircle);
app.use("/api/seller", SellingCircle);
app.use("/api/transport", TransportCircle)

// app.get("/", (req, res) => {
//     res.send("Welcome to Samriddhi Backend App...)")
// })

app.get("/", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "index.html")
    // console.log(paath);
    res.sendFile(paath)
    // console.log(path);
})

app.get("/selectCircles", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "selectCircles.html")
    res.sendFile(paath)
})

app.get("/memberCircleSelection", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "memberCircleSelection.html")
    res.sendFile(paath)
})



app.get("/background", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "img", "background.jpg")
    res.sendFile(paath)
})
app.get("/img_buyer", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "img", "buyer.jpg")
    res.sendFile(paath)
})
app.get("/img_seller", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "img", "seller.png")
    res.sendFile(paath)
})
app.get("/img_transport", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "img", "transport.png")
    res.sendFile(paath)
})

// --------------------ADMIN-------------------

app.get("/adminBuyerLogin", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Admin", "Buyer", "login.html")
    res.sendFile(paath)
})
app.get("/adminBuyerRegister", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Admin", "Buyer", "Register.html")
    res.sendFile(paath)
})

app.get("/adminBuyerDashboard", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Admin", "Buyer", "BuyingCircleDashboard.html")
    res.sendFile(paath)
})



// ------------------MEMBERS-----------------

app.get("/memberBuyerLogin", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Members", "Buyer", "login.html")
    res.sendFile(paath)
})
app.get("/memberSellerLogin", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Members", "Seller", "login.html")
    res.sendFile(paath)
})
app.get("/memberTransportLogin", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Members", "Transport", "login.html")
    res.sendFile(paath)
})

app.get("/BuyerDashboard", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Members", "Buyer", "BuyerDashboard.html")
    res.sendFile(paath)
})
app.get("/SellerDashboard", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Members", "Seller", "SellerDashboard.html")
    res.sendFile(paath)
})
app.get("/TransportDashboard", (req, res) => {
    let paath = process.cwd()
    paath = path.join(paath, "frontend", "Members", "Transport", "TransportDashboard.html")
    res.sendFile(paath)
})



// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
