// backend/services/priceEngine.js

const {watchlistMap, indexMap, basePrices } = require("../constants/marketData");
const { toCents, fromCents } = require("../util/financialMath");
const { HoldingsModel } = require("../model/HoldingsModel");

// --- Shared mutable price state (module-level singleton) ---
const currentPrices  = {};
const openingPrices  = { "NIFTY 50": 23000.45, "SENSEX": 75000.85 };
const lastLiveUpdate = {};

// Initialise currentPrices from basePrices so they're never 0
[...Object.keys(indexMap), ...Object.keys(watchlistMap)].forEach(ticker => {
  currentPrices[ticker] = fromCents(toCents(basePrices[ticker] || 100.00));
});

// --- Public getters used by controllers ---
const getCurrentPrices  = () => currentPrices;
const getOpeningPrices  = () => openingPrices;
const getLastLiveUpdate = () => lastLiveUpdate;

/**
 * Syncs live prices on startup via Angel One REST (OHLC mode).
 */
const fetchInitialQuotes = async (angelOne) => {
  if (!process.env.ANGEL_ONE_API_KEY) return;

  const nseTokens = [...new Set(Object.values(watchlistMap)), indexMap["NIFTY 50"].token];
  const bseTokens = [indexMap["SENSEX"].token];

  console.log(`[${new Date().toISOString()}] INFO: Syncing initial prices with Angel One REST API...`);

  try {
    const exchanges = [
      { name: "NSE", tokens: nseTokens },
      { name: "BSE", tokens: bseTokens }
    ];

    for (const exch of exchanges) {
      const response = await angelOne.smartApi.marketData({
        mode: "OHLC",
        exchangeTokens: { [exch.name]: exch.tokens }
      });

      if (response?.status && response?.data?.fetched) {
        for (const item of response.data.fetched) {
          const livePrice = Number(item.ltp);
          const openPrice = Number(item.open);

          const indexName = Object.keys(indexMap).find(n => indexMap[n].token === item.symbolToken);
          if (indexName) {
            currentPrices[indexName] = livePrice;
            openingPrices[indexName] = openPrice;
            continue;
          }

          const internalTickers = Object.keys(watchlistMap).filter(t => watchlistMap[t] === item.symbolToken);
          for (const ticker of internalTickers) {
            currentPrices[ticker] = livePrice;
            await HoldingsModel.updateMany(
              { name: ticker },
              { $set: { price: livePrice, openingPrice: openPrice } }
            ).catch(e => console.error(`[STARTUP_SYNC] ${ticker}:`, e.message));
          }
        }
      }
      await new Promise(r => setTimeout(r, 500));
    }
  } catch (error) {
    console.warn(`[${new Date().toISOString()}] WARN: Initial quote fetch failed:`, error.message);
  }
  console.log(`[${new Date().toISOString()}] INFO: Initial price sync complete.`);
};

/**
 * Starts the 2s simulation/heartbeat loop.
 * Call once after server starts. Requires io and processPendingOrders.
 */
const startPriceSimulation = (io, processPendingOrders, getConnectionStatus) => {
  let dbSyncCounter = 0;

  setInterval(() => {
    // Always simulate indices
    ["NIFTY 50", "SENSEX"].forEach(ticker => {
      const change = (Math.random() * 0.0002) - 0.0001;
      currentPrices[ticker] = fromCents(toCents(currentPrices[ticker] * (1 + change)));
    });

    // Simulate stocks if WS is down or stock hasn't had a live update in 30s
    Object.keys(currentPrices).forEach(ticker => {
      if (ticker === "NIFTY 50" || ticker === "SENSEX") return;
      const lastUpdate = lastLiveUpdate[ticker] || 0;
      if (!getConnectionStatus() || Date.now() - lastUpdate > 30000) {
        const volatility = 0.001;
        const change = (Math.random() * volatility) - (volatility / 2);
        currentPrices[ticker] = fromCents(toCents(currentPrices[ticker] * (1 + change)));
      }
    });

    processPendingOrders();
    io.emit("priceUpdate", currentPrices);

    dbSyncCounter++;
    if (dbSyncCounter >= 15) {
      dbSyncCounter = 0;
      Object.keys(currentPrices).forEach(ticker => {
        if (ticker === "NIFTY 50" || ticker === "SENSEX") return;
        HoldingsModel.updateMany({ name: ticker }, { $set: { price: currentPrices[ticker] } })
          .catch(err => console.error(`[DB_SYNC] ${ticker}:`, err.message));
      });
    }
  }, 2000);
};

module.exports = {
  getCurrentPrices,
  getOpeningPrices,
  getLastLiveUpdate,
  currentPrices,
  openingPrices,
  lastLiveUpdate,
  fetchInitialQuotes,
  startPriceSimulation,
};