const { model, Schema } = require("mongoose");

const TransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  status: { type: String, default: "SUCCESS" },
  createdAt: { type: Date, default: Date.now },
});

const TransactionModel = model("transaction", TransactionSchema);

module.exports = { TransactionModel };