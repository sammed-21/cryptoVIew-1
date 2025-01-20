import mongoose, { model } from "mongoose";

const nftSchema = new mongoose.Schema({
  contractAddress: String,
  tokenId: String,
  metadata: Object,
});

export default model("NFTSchema", nftSchema);
