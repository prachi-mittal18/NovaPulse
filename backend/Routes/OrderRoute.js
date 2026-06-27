// backend/Routes/OrderRoute.js

const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const { placeOrder }       = require("../Controllers/OrdersController");

const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 500,
  message: { message: "Order rate limit exceeded.", success: false },
});

router.post("/newOrder", orderLimiter, userVerification, placeOrder);

module.exports = router;