// backend/Controllers/MarketController.js

const { UserModel }     = require("../model/UserModel");
const { formatUserCount } = require("../util/financialMath");
const { getCurrentPrices, getOpeningPrices, getLastLiveUpdate } = require("../services/priceEngine");
const { watchlistMap }  = require("../constants/marketData");

module.exports.getMarketIndices = (req, res) => {
  return res.status(200).json(getOpeningPrices());
};

module.exports.getPlatformStats = async (req, res) => {
  try {
    const activeUserCount = await UserModel.countDocuments();
    return res.status(200).json({
      success:        true,
      activeUsers:    activeUserCount,
      formattedUsers: formatUserCount(activeUserCount),
    });
  } catch (error) {
    console.error(`[PLATFORM_STATS] Error:`, error);
    return res.status(500).json({ success: false, message: "Error fetching platform stats", activeUsers: 0 });
  }
};

module.exports.getPriceDiagnostics = (req, res) => {
  const currentPrices  = getCurrentPrices();
  const lastLiveUpdate = getLastLiveUpdate();

  const diagnostics = {
    lastUpdated:       new Date().toISOString(),
    angelOneConnected: require("../services/angelOneState").isConnected(),
    stocks: {}
  };

  Object.keys(watchlistMap).forEach(ticker => {
    const lastUpdate = lastLiveUpdate[ticker] || 0;
    const timeSince  = lastUpdate > 0 ? Date.now() - lastUpdate : -1;
    diagnostics.stocks[ticker] = {
      currentPrice:         currentPrices[ticker] || 0,
      token:                watchlistMap[ticker],
      lastLiveUpdate:       new Date(lastUpdate).toISOString(),
      isLive:               timeSince >= 0 && timeSince < 60000,
      timeSinceLastUpdateMs: timeSince
    };
  });

  return res.status(200).json(diagnostics);
};

module.exports.getAllPositions = async (req, res) => {
  const { PositionsModel } = require("../model/PositionsModel");
  try {
    const allPositions = await PositionsModel.find({ user: req.user.id });
    return res.status(200).json(allPositions);
  } catch (error) {
    console.error(`[GET_POSITIONS] Error:`, error);
    return res.status(500).json({ message: "Error fetching positions", success: false });
  }
};