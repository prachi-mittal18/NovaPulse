const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../model/UserModel");
const { TransactionModel } = require("../model/TransactionModel");
const { userVerification } = require("../Middlewares/AuthMiddleware");

// Initialize Razorpay with credentials from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper functions for safe financial math using scaled integers (cents/paise)
const toCents = (val) => Math.round(Number(val) * 100);
const fromCents = (cents) => Number((cents / 100).toFixed(2));

/**
 * Fetch Transaction History
 */
router.get("/history", userVerification, async (req, res) => {
  try {
    const transactions = await TransactionModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", success: false });
  }
});

/**
 * Step 1: Create an Order
 * This endpoint is called when the user clicks 'Add Funds'.
 * It generates a unique Order ID from Razorpay.
 */
router.post("/create-order", userVerification, async (req, res) => {
  try {
    console.log(`[PAYMENT] Creating order for user: ${req.user.username}`);
    const { amount } = req.body; // amount in INR
    const options = {
      amount: toCents(amount), // Razorpay expects amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    res.status(500).json({ message: "Could not create Razorpay order", success: false });
  }
});

/**
 * Withdrawal Endpoint
 */
router.post("/withdraw", userVerification, async (req, res) => {
  try {
    const { amount, pin } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the user has even set a PIN yet
    if (user.tradingPin === undefined || user.tradingPin === null || user.tradingPin === "") {
      return res.status(400).json({ message: "Trading PIN not set. Please set it in your profile first.", success: false });
    }

    // Convert PIN to string and trim whitespace to ensure consistent comparison
    const pinString = String(pin).trim();
    
    console.log(`[WITHDRAW] User: ${user.username} | PIN received: "${pinString}" | Type: ${typeof pinString} | Length: ${pinString.length}`);
    console.log(`[WITHDRAW] Stored hash exists: ${!!user.tradingPin} | Hash length: ${user.tradingPin?.length}`);
    
    const isPinValid = await bcrypt.compare(pinString, user.tradingPin);
    console.log(`[WITHDRAW] PIN validation result: ${isPinValid}`);
    
    if (!isPinValid) {
      return res.status(403).json({ message: "Invalid Trading PIN", success: false });
    }

    const amountCents = toCents(amount);
    const balanceCents = toCents(user.balance);

    if (amountCents <= 0) return res.status(400).json({ message: "Invalid amount", success: false });
    if (balanceCents < amountCents) return res.status(400).json({ message: "Insufficient balance for withdrawal", success: false });

    // Atomic Update: Use $inc to prevent race conditions
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $inc: { balance: -amount } },
      { new: true }
    );

    await TransactionModel.create({
      user: updatedUser._id,
      amount: -amount, // Negative for withdrawal
      razorpay_order_id: "N/A",
      razorpay_payment_id: `WITHDRAW_${Date.now()}`,
      status: "WITHDRAWN"
    });

    res.status(200).json({ message: "Withdrawal successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error during withdrawal", success: false });
  }
});

/**
 * Step 2: Verify Payment Signature
 * This endpoint is called after the user completes the payment in the Razorpay modal.
 * It verifies that the payment is legitimate before updating the user's balance.
 */
router.post("/verify", userVerification, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    console.log(`[PAYMENT_VERIFY] Attempting verification for Order: ${razorpay_order_id}`);
 
    // Generate expected signature using HMAC-SHA256
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      console.log(`[PAYMENT_VERIFY] Signature matched. Updating DB...`);

      // Fetch order details from Razorpay to get the actual amount paid
      const order = await razorpay.orders.fetch(razorpay_order_id);

      // Robustness: Ensure the order is actually marked as paid by Razorpay
      if (order.status !== "paid" && order.amount_paid === 0) {
        return res.status(400).json({ message: "Payment not confirmed by gateway", success: false });
      }

      const amountPaidINR = order.amount / 100;

      // Atomic Update: Safely increment balance
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        { $inc: { balance: amountPaidINR } },
        { new: true }
      );

      // Log the transaction in the ledger
      await TransactionModel.create({
        user: updatedUser._id,
        amount: amountPaidINR,
        razorpay_order_id,
        razorpay_payment_id,
        status: "SUCCESS"
      });

      console.log(`[PAYMENT_SUCCESS] DB Confirmed - User: ${updatedUser.username} | Persisted Balance: ₹${updatedUser.balance}`);

      return res.status(200).json({ message: "Payment verified and wallet updated successfully", success: true });
    } else {
      console.warn(`[PAYMENT_WARN] Signature mismatch for Order: ${razorpay_order_id}`);
      return res.status(400).json({ message: "Invalid payment signature", success: false });
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    res.status(500).json({ message: "Payment verification failed", success: false });
  }
});

module.exports = router;