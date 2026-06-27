// backend/config/db.js

const mongoose = require("mongoose");
const { UserModel }   = require("../model/UserModel");
const { OrdersModel } = require("../model/OrdersModel");

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log("MongoDB connected successfully");

  try {
    // One-time migration: add default balance to old users
    const result = await UserModel.updateMany(
      { balance: { $exists: false } },
      { $set: { balance: 100000 } }
    );
    if (result.modifiedCount > 0) {
      console.log(`Migrated balance for ${result.modifiedCount} existing user(s).`);
    }

    // Compound index for fast order matching
    await OrdersModel.collection.createIndex({ status: 1, name: 1 });
    console.log("MongoDB index verified for Orders (status, name).");
  } catch (err) {
    console.error("DB initialisation error:", err.message);
  }
};

module.exports = { connectDB };