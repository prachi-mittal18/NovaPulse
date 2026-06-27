// backend/Routes/MarketRoute.js

const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");
const {
  getMarketIndices,
  getPlatformStats,
  getPriceDiagnostics,
  getAllPositions,
} = require("../Controllers/MarketController");
const { getAllHoldings, getFunds, getPnlTrend } = require("../Controllers/HoldingsController");
const { getAllOrders }  = require("../Controllers/OrdersController");

// Public market endpoints
router.get("/api/market-indices",    getMarketIndices);
router.get("/api/platform-stats",    getPlatformStats);
router.get("/api/price-diagnostics", getPriceDiagnostics);

// Protected endpoints
router.get("/allHoldings",    userVerification, getAllHoldings);
router.get("/allPositions",   userVerification, getAllPositions);
router.get("/allOrders",      userVerification, getAllOrders);
router.get("/user/funds",     userVerification, getFunds);
router.get("/user/pnl-trend", userVerification, getPnlTrend);

module.exports = router;