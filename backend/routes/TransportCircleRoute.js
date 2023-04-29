const express = require("express");
const { registerCirlce, getAllTransportcircles, adminLogin, Logout, registerCirlceMember, Login, transportRequest } = require("../controllers/TransportCircleController");
const { isTAdmin, isTAuthenticatedUser } = require("../middleware/auth");
const { getMatchedOrders } = require("../controllers/OrderMatchController");
const { getAllFinalOrders } = require("../controllers/FinalOrderController");
const { getSales } = require("../controllers/SaleController");
const { getAllOrders } = require("../controllers/BuyOrderController");
const { getAggregatedOrders } = require("../controllers/OrderAggregationController");
const router = express.Router();

// to get all existing transport circles
router.route("/circles").get(getAllTransportcircles)

// creating a transport circle
router.route("/addcircle").post(registerCirlce)
// admin login
router.route("/adminlogin").post(adminLogin)
// admin logout
router.route("/adminlogout").get(Logout)
// adding a member to transport circle by admin
router.route("/addcirclemember").post(isTAdmin, registerCirlceMember)
// Member login
router.route("/login").post(Login)
// Member logout
router.route("/logout").get(Logout)

// to get all sales
router.route("/sales").get(getSales)
// to get all buyOrders
router.route("/buyorders").get(getAllOrders)
// to get all AggregatedBuyOrders
router.route("/buyordersAggregate").get(getAggregatedOrders)
// to get all Matched-orders
router.route("/matchedorders").get(getMatchedOrders)
//  to get all final orders
router.route("/orders").get(getAllFinalOrders)

// to request for transport order of final orders
router.route("/transportrequest").post(isTAuthenticatedUser,transportRequest)




module.exports = router;
