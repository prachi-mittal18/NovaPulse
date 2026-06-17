const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  openingPrice: {
    type: Number,
    default: null, // Will be updated from Angel One on startup
  },
});
module.exports = { HoldingsSchema };
