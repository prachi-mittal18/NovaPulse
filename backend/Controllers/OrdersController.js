// backend/Controllers/OrdersController.js

const { OrdersModel }   = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { UserModel }     = require("../model/UserModel");
const { toCents, fromCents } = require("../util/financialMath");
const { getCurrentPrices }   = require("../services/priceEngine");
const { watchlistMap }       = require("../constants/marketData");

module.exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(allOrders);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ERROR: getAllOrders:`, error);
    return res.status(500).json({ message: "Error fetching orders", success: false });
  }
};

module.exports.placeOrder = async (req, res) => {
  try {
    const currentPrices = getCurrentPrices();
    const user = await UserModel.findById(req.user.id);

    const canonicalName = req.body.name === "HUL" ? "HINDUNILVR" : req.body.name;
    const qty            = Number(req.body.qty);
    const priceCents     = toCents(req.body.price);
    const orderValueCents = qty * priceCents;
    const userBalanceCents = toCents(user.balance);
    const marketPrice    = currentPrices[canonicalName] || req.body.price;

    let orderStatus = "COMPLETE";
    if (req.body.orderType === "LIMIT") {
      if (req.body.mode === "BUY"  && marketPrice > req.body.price)  orderStatus = "PENDING";
      if (req.body.mode === "SELL" && marketPrice < req.body.price)  orderStatus = "PENDING";
    }

    const newOrder = new OrdersModel({
      name: canonicalName,
      qty: req.body.qty,
      mode: req.body.mode,
      price: req.body.price,
      orderType: req.body.orderType || "MARKET",
      status: orderStatus,
      user: req.user.id,
    });

    // Pre-execution validation
    if (req.body.mode === "BUY") {
      if (userBalanceCents < orderValueCents) {
        newOrder.status = "REJECTED";
        await newOrder.save();
        return res.status(400).json({ message: "Insufficient funds", success: false });
      }
    } else if (req.body.mode === "SELL") {
      const existing = await HoldingsModel.findOne({ user: req.user.id, name: canonicalName });
      if (!existing || existing.qty < qty) {
        newOrder.status = "REJECTED";
        await newOrder.save();
        return res.status(400).json({ message: "Insufficient quantity to sell", success: false });
      }
    }

    if (orderStatus === "PENDING") {
      await newOrder.save();
      return res.status(201).json({ message: "Limit order placed. Status: PENDING", success: true });
    }

    // Execute immediately
    if (req.body.mode === "BUY") {
      await newOrder.save();
      user.balance = fromCents(userBalanceCents - orderValueCents);
      await user.save();

      const existing = await HoldingsModel.findOne({ user: req.user.id, name: canonicalName });
      if (existing) {
        const totalQty     = existing.qty + qty;
        const newAvgCents  = Math.round(((existing.qty * toCents(existing.avg)) + (qty * priceCents)) / totalQty);
        existing.qty = totalQty;
        existing.avg = fromCents(newAvgCents);
        await existing.save();
      } else {
        await HoldingsModel.create({ name: canonicalName, qty: req.body.qty, avg: req.body.price, price: req.body.price, user: req.user.id, net: "0%", day: "0%" });
      }
    } else if (req.body.mode === "SELL") {
      const existing = await HoldingsModel.findOne({ user: req.user.id, name: canonicalName });
      await newOrder.save();
      user.balance = fromCents(userBalanceCents + orderValueCents);
      await user.save();
      if (existing.qty - qty === 0) {
        await HoldingsModel.deleteOne({ _id: existing._id });
      } else {
        existing.qty -= qty;
        await existing.save();
      }
    }

    console.log(`[ORDER_COMPLETE] ${req.user.id} | ${req.body.mode} ${req.body.qty} ${req.body.name} @ ${req.body.price}`);
    return res.status(201).json({ message: "Order saved successfully", success: true });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ERROR: placeOrder:`, error.message);
    return res.status(500).json({ message: "Failed to save order", success: false });
  }
};