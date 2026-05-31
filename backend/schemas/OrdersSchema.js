const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: String,
  qty: Number,
  mode: String,
  price: Number,
  orderType: String,
  status: {
    type: String,
    default: "COMPLETE",
  },
}, { timestamps: true });
module.exports = { OrdersSchema };