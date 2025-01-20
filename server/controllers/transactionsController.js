import axios from "axios";
// import { Transaction } from "mongodb";
import Transaction from "../models/transactionsModel.js";

export const createTransaction = async (req, res) => {
  const { address } = req.body;

  try {
    // Build the API URL
    const etherscanUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&page=1&offset=5&sort=asc&apikey=STPJNTFV7Z3CMDTEIINHWIFZMXFE7J5YC9`;

    // Fetch data from Etherscan
    const response = await axios.get(etherscanUrl);
    // Validate the response
    if (!response.data || response.data.status !== "1") {
      throw new Error(
        response.data.result || "Invalid response from Etherscan"
      );
    }

    // Extract transactions
    const transactions = response.data.result;

    // Store transactions in MongoDB
    const txRecord = new Transaction({ address, transactions });
    await txRecord.save();

    res.json({ success: true, transactions });
  } catch (error) {
    console.error("Error retrieving transactions:", error.message);
    res.status(500).json({
      error: "Failed to retrieve transactions",
      details: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  const { address } = req.query;

  try {
    console.log({ address });
    const transactions = await Transaction.find({ address });
    res.json({ success: true, transactions });
  } catch (error) {
    console.error("Error querying transactions:", error);
    res.status(500).json({ error: "Failed to query transactions" });
  }
};
