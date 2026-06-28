require("dotenv").config();

// Normalize .env keys/values (handles accidental spaces)
Object.keys(process.env).forEach((key) => {
  const trimmedKey = key.trim();
  const value = process.env[key] ? process.env[key].trim() : "";
  if (trimmedKey !== key) delete process.env[key];
  process.env[trimmedKey] = value;
});

const express      = require("express");
const http         = require("http");
const cors         = require("cors");
const cookieParser = require("cookie-parser");
const helmet       = require("helmet");
const rateLimit    = require("express-rate-limit");

const { connectDB }        = require("./config/db");
const { createSocketServer } = require("./config/socketConfig");
const { startPriceSimulation, fetchInitialQuotes } = require("./services/priceEngine");
const { processPendingOrders } = require("./services/orderEngine");
const { setConnected }     = require("./services/angelOneState");
const AngelOneService      = require("./services/AngelOneService");
const { watchlistMap }     = require("./constants/marketData");

const authRoute    = require("./Routes/AuthRoute");
const paymentRoute = require("./Routes/PaymentRoute");
const marketRoute  = require("./Routes/MarketRoute");
const orderRoute   = require("./Routes/OrderRoute");

const PORT = process.env.PORT || 3002;
const url  = process.env.MONGO_URL;
const tokenKey = process.env.TOKEN_KEY;

if (!url)      { console.error("FATAL: MONGO_URL not defined"); process.exit(1); }
if (!tokenKey) { console.error("FATAL: TOKEN_KEY not defined"); process.exit(1); }

const allowedOrigins = (process.env.FRONTEND_URLS || "http://localhost:3001,http://localhost:3000")
  .split(",").map(u => u.trim().replace(/\/$/, ""));

const app    = express();
app.set("trust proxy", 1);
const server = http.createServer(app);
const io     = createSocketServer(server, allowedOrigins);

// Middleware
app.use(helmet({ crossOriginOpenerPolicy: false, crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(cors({
  origin: (origin, cb) => (!origin || allowedOrigins.includes(origin)) ? cb(null, true) : cb(new Error("Not allowed by CORS")),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));
app.use(cookieParser());
app.use(express.json());

const authLimiter = rateLimit({ windowMs: 60 * 1000, max: 500, message: { message: "Too many attempts.", success: false } });

// Routes
app.use("/", authLimiter, authRoute);
app.use("/api/payments", paymentRoute);
app.use("/", marketRoute);
app.use("/", orderRoute);

// Angel One WebSocket
const uniqueSymbols = [...new Set(Object.values(watchlistMap))];
const { getCurrentPrices, lastLiveUpdate } = require("./services/priceEngine");
const { toCents, fromCents } = require("./util/financialMath");

let batchEmitScheduled = false;
const pendingTickerExecution = new Set();

const handleTradeUpdate = (token, price) => {
  const priceCents = toCents(price);
  const safePrice  = fromCents(priceCents);
  const internalTickers = Object.keys(watchlistMap).filter(k => watchlistMap[k] === token);

  internalTickers.forEach(ticker => {
    getCurrentPrices()[ticker]  = safePrice;
    lastLiveUpdate[ticker] = Date.now();
    if (!pendingTickerExecution.has(ticker)) {
      pendingTickerExecution.add(ticker);
      setImmediate(() =>
        processPendingOrders(ticker)
          .catch(err => console.error(`[ORDER_ENGINE] ${ticker}:`, err.message))
          .finally(() => pendingTickerExecution.delete(ticker))
      );
    }
  });

  if (!batchEmitScheduled) {
    batchEmitScheduled = true;
    setImmediate(() => { io.emit("priceUpdate", getCurrentPrices()); batchEmitScheduled = false; });
  }
};

const angelOne = new AngelOneService(
  
  process.env.ANGEL_ONE_API_KEY,
  process.env.ANGEL_ONE_CLIENT_ID,
  process.env.ANGEL_ONE_PASSWORD,
  process.env.ANGEL_ONE_TOTP_SECRET,
  uniqueSymbols,
  handleTradeUpdate,
  (status) => {
    console.log(`[ANGEL_ONE] Status: ${status ? "CONNECTED" : "DISCONNECTED"}`);
    setConnected(status);
    io.emit("connectionStatus", { isLive: status });
    if (status) fetchInitialQuotes(angelOne);
  }
);
require("./services/angelOneInstance").setInstance(angelOne);

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") { console.error(`FATAL: Port ${PORT} in use`); process.exit(1); }
  console.error("SERVER ERROR:", e.message);
});

server.listen(PORT, async () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
  angelOne.connect();
  startPriceSimulation(io, processPendingOrders, () => require("./services/angelOneState").isConnected());
  await connectDB(url);
});