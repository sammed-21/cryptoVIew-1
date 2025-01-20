import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  address: { type: String, required: true },
  transactions: { type: Array, default: [] },
  timestamp: { type: Date, default: Date.now },
});

// Export the model with a meaningful name
export default mongoose.model("Transaction", transactionSchema);
