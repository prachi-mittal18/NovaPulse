// backend/services/orderEngine.js

const { OrdersModel }   = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { UserModel }     = require("../model/UserModel");
const { toCents, fromCents } = require("../util/financialMath");
const { getCurrentPrices }   = require("./priceEngine");

const processPendingOrders = async (targetTicker = null) => {
  try {
    const query = { status: "PENDING" };
    if (targetTicker) query.name = targetTicker;

    const pendingOrders = await OrdersModel.find(query);
    const currentPrices = getCurrentPrices();

    for (const pendingOrder of pendingOrders) {
      // Atomic lock to prevent race conditions
      const order = await OrdersModel.findOneAndUpdate(
        { _id: pendingOrder._id, status: "PENDING" },
        { $set: { status: "PROCESSING" } },
        { new: true }
      );
      if (!order) continue;

      const currentPrice = currentPrices[order.name];
      if (currentPrice === undefined) {
        await OrdersModel.updateOne({ _id: order._id }, { $set: { status: "PENDING" } });
        continue;
      }

      let shouldExecute = false;
      if (order.mode === "BUY"  && currentPrice <= order.price) shouldExecute = true;
      if (order.mode === "SELL" && currentPrice >= order.price) shouldExecute = true;

      if (!shouldExecute) {
        await OrdersModel.updateOne({ _id: order._id }, { $set: { status: "PENDING" } });
        continue;
      }

      try {
        const user = await UserModel.findById(order.user);
        const priceCents      = toCents(currentPrice);
        const orderValueCents = order.qty * priceCents;
        const userBalanceCents = toCents(user.balance);

        if (order.mode === "BUY") {
          if (userBalanceCents < orderValueCents) {
            order.status = "REJECTED";
            await order.save();
            console.log(`[ORDER_REJECTED] Pending BUY ${order.qty} ${order.name} — insufficient funds`);
            continue;
          }
          user.balance = fromCents(userBalanceCents - orderValueCents);
          await user.save();

          const existing = await HoldingsModel.findOne({ user: order.user, name: order.name });
          if (existing) {
            const totalQty   = existing.qty + order.qty;
            const newAvgCents = Math.round(((existing.qty * toCents(existing.avg)) + (order.qty * priceCents)) / totalQty);
            existing.qty = totalQty;
            existing.avg = fromCents(newAvgCents);
            await existing.save();
          } else {
            await HoldingsModel.create({ name: order.name, qty: order.qty, avg: currentPrice, price: currentPrice, user: order.user });
          }
        } else if (order.mode === "SELL") {
          const existing = await HoldingsModel.findOne({ user: order.user, name: order.name });
          if (!existing || existing.qty < order.qty) {
            order.status = "REJECTED";
            await order.save();
            console.log(`[ORDER_REJECTED] Pending SELL ${order.qty} ${order.name} — insufficient qty`);
            continue;
          }
          user.balance = fromCents(userBalanceCents + orderValueCents);
          await user.save();
          if (existing.qty === order.qty) {
            await HoldingsModel.deleteOne({ _id: existing._id });
          } else {
            existing.qty -= order.qty;
            await existing.save();
          }
        }

        order.status = "COMPLETE";
        order.price  = currentPrice;
        await order.save();
        console.log(`[ORDER_COMPLETE] Pending ${order.mode} ${order.qty} ${order.name} @ ${currentPrice}`);
      } catch (err) {
        console.error(`[ORDER_ERROR] ${order._id}:`, err.message);
        await OrdersModel.updateOne({ _id: order._id }, { $set: { status: "PENDING" } });
      }
    }
  } catch (err) {
    console.error(`[ORDER_ENGINE] Error:`, err.message);
  }
};

module.exports = { processPendingOrders };