import { Schema, model } from "mongoose";

const tradeSchema = new Schema({
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  currencyPair: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  orderType: { type: String, enum: ["market", "limit"], required: true },
  transactionHash: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "pending",
  },
});

export default model("Trade", tradeSchema);
