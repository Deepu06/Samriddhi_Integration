const express = require("express");
const { registerCirlce,
    registerCirlceMember,
    membersOfCircle,
    adminLogin,
    Logout,
    Login,
    forgotPassword,
    resetPassword,
    updatePassword,
    deleteCircleMember,
    getUserDetails,
    getMyDetails,
    updateProfile
} = require("../controllers/BuyingCirlceController");
const { createBuyOrder, getAllOrders } = require("../controllers/BuyOrderController");
const { createCart, updateCart, updateCartAddItems } = require("../controllers/CartController");
const { getSales } = require("../controllers/SaleController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.route("/addcircle").post(registerCirlce)
router.route("/addcirclemember").post(isAdmin, registerCirlceMember)
// router.route("/getmembers").get(isAuthenticatedUser, isAdmin, membersOfCircle)
router.route("/getmembers").get(membersOfCircle)
router.route("/adminlogin").post(adminLogin)
router.route("/adminlogout").get(Logout)
router.route("/admin/:id").get(isAdmin, getUserDetails).delete(isAdmin, deleteCircleMember);

router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.get("/me", isAuthenticatedUser, getMyDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);


// updating or creating cart by buyers..

router.route("/cart").post(isAuthenticatedUser, createCart).get()
router.route("/cart/add").put(isAuthenticatedUser, updateCartAddItems)
router.route("/cart/update").put(isAuthenticatedUser, updateCartAddItems)


// to get current active sales
router.route("/sales").get(getSales)

// to place an order by circle admin with buyer reference
router.route("/buyorder").post(isAdmin, createBuyOrder).get(getAllOrders)
module.exports = router;
