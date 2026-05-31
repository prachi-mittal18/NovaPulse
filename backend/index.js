require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.FRONTEND_URLS 
  ? process.env.FRONTEND_URLS.split(",") 
  : ["http://localhost:3000", "http://localhost:3001"];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { userVerification } = require("./Middlewares/AuthMiddleware");

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);

// app.get("/addHoldings" , async(req,res)=>{
// let tempHolding = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },

// ];

// tempHolding.forEach((item) =>{
// let newHolding = new HoldingsModel({
//       name: item.name,
//   qty: item.qty,
//   avg: item.avg,
//   price: item.price,
//   net: item.net,
//   day: item.day,
// });

// newHolding.save();
// });
// res.send("Data inserted.");
// });

// app.get("/addPositions",async(req,res)=>{
// let tempPosition = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

// tempPosition.forEach((item) =>{
//     let newPosition = new PositionsModel({
//          product: item.product,
//   name: item.name,
//   qty: item.qty,
//   avg: item.avg,
//   net: item.net,
//   day: item.day,
//   isLoss: item.isLoss,
//   price: item.price,
//     });

//     newPosition.save();
// }) ;
// res.send("new positions added");
// });

app.get("/allHoldings", userVerification, async (req, res) => {
  // Professional approach: Filter by the authenticated user's ID
  // This assumes you've added user: { type: Schema.Types.ObjectId, ref: 'user' } to your model
  const allHoldings = await HoldingsModel.find({ user: req.user.id });
  return res.status(200).json(allHoldings);
});

app.get("/allPositions", userVerification, async (req, res) => {
  // Always isolate data to the logged-in user
  const allPositions = await PositionsModel.find({ user: req.user.id });
  return res.status(200).json(allPositions);
});

app.get("/allOrders", userVerification, async (req, res) => {
  // Sort by createdAt in descending order (-1) to show newest orders first
  const allOrders = await OrdersModel.find({ user: req.user.id }).sort({ createdAt: -1 });
  return res.status(200).json(allOrders);
});

app.get("/user/funds", userVerification, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const allHoldings = await HoldingsModel.find({ user: req.user.id });

    // Calculate total investment (Margin Used) using safe financial math
    const marginUsedCents = allHoldings.reduce((acc, holding) => {
      return acc + (holding.qty * toCents(holding.avg));
    }, 0);

    return res.status(200).json({
      balance: user.balance,
      marginUsed: fromCents(marginUsedCents),
      openingBalance: user.openingBalance || user.balance,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching funds summary", success: false });
  }
});

// Helper functions for safe financial math using scaled integers (cents/paise)
// to completely prevent floating-point representation errors (e.g. 0.1 + 0.2 = 0.30000000000000004)
const toCents = (amount) => Math.round(Number(amount) * 100);
const fromCents = (cents) => Number((cents / 100).toFixed(2));

app.post("/newOrder", userVerification, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const qty = Number(req.body.qty);
    const priceCents = toCents(req.body.price);
    const orderValueCents = qty * priceCents;

    const userBalanceCents = toCents(user.balance);
    const marketPrice = currentPrices[req.body.name] || req.body.price;
    
    let orderStatus = "COMPLETE";

    // Price validation for Limit Orders
    if (req.body.orderType === "LIMIT") {
      if (req.body.mode === "BUY" && marketPrice > req.body.price) {
        orderStatus = "PENDING";
      } else if (req.body.mode === "SELL" && marketPrice < req.body.price) {
        orderStatus = "PENDING";
      }
    }

    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      mode: req.body.mode,
      price: req.body.price,
      orderType: req.body.orderType || "MARKET",
      status: orderStatus,
      user: req.user.id, // Associate the order with the person who placed it
    });

    // Validation check for BUY: Insufficient Funds
    if (req.body.mode === "BUY" && userBalanceCents < orderValueCents) {
      newOrder.status = "REJECTED";
      await newOrder.save();
      return res.status(400).json({ message: "Insufficient funds", success: false });
    }

    if (orderStatus === "PENDING") {
      await newOrder.save();
      return res.status(201).json({ 
        message: "Limit order placed. Status: PENDING", 
        success: true 
      });
    }

    // Logic to update Holdings based on the order
    if (req.body.mode === "BUY") {
      await newOrder.save(); // Saves as COMPLETE

      const existingHolding = await HoldingsModel.findOne({ 
        user: req.user.id, 
        name: req.body.name 
      });

      // Safely subtract balance in cents
      user.balance = fromCents(userBalanceCents - orderValueCents);
      await user.save();

      if (existingHolding) {
        const totalQty = existingHolding.qty + qty;
      
        // new avg = ((old qnty * old avg) + (new qnty * new avg)) / total qnty
        const existingAvgCents = toCents(existingHolding.avg);
        const newAvgCents = Math.round(((existingHolding.qty * existingAvgCents) + (qty * priceCents)) / totalQty);
        
        existingHolding.qty = totalQty;
        existingHolding.avg = fromCents(newAvgCents);
        await existingHolding.save();
      } else {
        await HoldingsModel.create({
          name: req.body.name,
          qty: req.body.qty,
          avg: req.body.price,
          price: req.body.price, // Market price at time of buy
          user: req.user.id,
          net: "0%",
          day: "0%"
        });
      }
    } else if (req.body.mode === "SELL") {
      const existingHolding = await HoldingsModel.findOne({ 
        user: req.user.id, 
        name: req.body.name 
      });

      if (!existingHolding || existingHolding.qty < qty) {
        newOrder.status = "REJECTED";
        await newOrder.save();
        return res.status(400).json({ message: "Insufficient quantity to sell", success: false });
      }

      await newOrder.save(); // Saves as COMPLETE

      // Safely add balance in cents
      user.balance = fromCents(userBalanceCents + orderValueCents);
      await user.save();

      const totalQty = existingHolding.qty - qty;
      
      if (totalQty === 0) {
        await HoldingsModel.deleteOne({ _id: existingHolding._id });
      } else {
        existingHolding.qty = totalQty;
        await existingHolding.save();
      }
    }

    return res.status(201).json({ message: "Order saved successfully", success: true });
  } catch (error) {
    console.error("Error saving order:", error);
    return res.status(500).json({ message: "Failed to save order", success: false });
  }
});

// Simulated Live Price Ticker
let currentPrices = {
  "NIFTY 50": 18000.45,
  "SENSEX": 60000.85,
  "INFY": 1500.20,
  "TCS": 3200.50,
  "RELIANCE": 2500.10,
  "BHARTIARTL": 540.60,
  "HDFCBANK": 1520.30,
  "ITC": 205.15,
  "TATAPOWER": 120.40,
  "WIPRO": 570.80,
  "M&M": 779.80,
  "HUL": 2417.40,
  "HINDUNILVR": 2417.40,
  "SBIN": 430.20,
  "KPITTECH": 266.45,
  "QUICKHEAL": 160.00,
  "ONGC": 116.80,
};

const processPendingOrders = async () => {
  try {
    const pendingOrders = await OrdersModel.find({ status: "PENDING" });

    for (const order of pendingOrders) {
      const currentPrice = currentPrices[order.name];
      if (!currentPrice) continue;

      let shouldExecute = false;
      if (order.mode === "BUY" && currentPrice <= order.price) {
        shouldExecute = true;
      } else if (order.mode === "SELL" && currentPrice >= order.price) {
        shouldExecute = true;
      }

      if (shouldExecute) {
        const user = await UserModel.findById(order.user);
        const priceCents = toCents(currentPrice);
        const orderValueCents = order.qty * priceCents;
        const userBalanceCents = toCents(user.balance);

        if (order.mode === "BUY") {
          if (userBalanceCents < orderValueCents) {
            order.status = "REJECTED"; // Funds might have been spent elsewhere while pending
            await order.save();
            continue;
          }

          user.balance = fromCents(userBalanceCents - orderValueCents);
          await user.save();

          const existingHolding = await HoldingsModel.findOne({ user: order.user, name: order.name });
          if (existingHolding) {
            const totalQty = existingHolding.qty + order.qty;
            const newAvgCents = Math.round(((existingHolding.qty * toCents(existingHolding.avg)) + (order.qty * priceCents)) / totalQty);
            existingHolding.qty = totalQty;
            existingHolding.avg = fromCents(newAvgCents);
            await existingHolding.save();
          } else {
            await HoldingsModel.create({ name: order.name, qty: order.qty, avg: currentPrice, price: currentPrice, user: order.user });
          }
        } else if (order.mode === "SELL") {
          const existingHolding = await HoldingsModel.findOne({ user: order.user, name: order.name });
          if (!existingHolding || existingHolding.qty < order.qty) {
            order.status = "REJECTED";
            await order.save();
            continue;
          }

          user.balance = fromCents(userBalanceCents + orderValueCents);
          await user.save();

          if (existingHolding.qty === order.qty) {
            await HoldingsModel.deleteOne({ _id: existingHolding._id });
          } else {
            existingHolding.qty -= order.qty;
            await existingHolding.save();
          }
        }

        order.status = "COMPLETE";
        order.price = currentPrice; // Update to actual execution price
        await order.save();
        console.log(`Executed Pending Order: ${order.mode} ${order.name} at ${currentPrice}`);
      }
    }
  } catch (err) {
    console.error("Error processing pending orders:", err);
  }
};

setInterval(() => {
  Object.keys(currentPrices).forEach((ticker) => {
    // Max 0.1% change per tick to simulate realistic market "noise"
    const volatility = 0.001; 
    const change = (Math.random() * volatility) - (volatility / 2);
    
    // Update the persistent server state
    const newPrice = currentPrices[ticker] * (1 + change);
    currentPrices[ticker] = Number(newPrice.toFixed(2));
  });

  processPendingOrders();
  // Emit the updated stateful prices to all connected clients
  io.emit("priceUpdate", currentPrices);
}, 2000);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log("app started ");
  mongoose.connect(url).then(async () => {
    console.log("DB connected ");
    // One-time migration: set balance for existing users who don't have it
    const result = await UserModel.updateMany(
      { balance: { $exists: false } },
      { $set: { balance: 100000 } }
    );
    if (result.modifiedCount > 0) {
      console.log(`Migrated balance for ${result.modifiedCount} existing user(s).`);
    }
  });
});
