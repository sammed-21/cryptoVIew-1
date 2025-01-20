import Trade from "../models/tradeModal.js";

// Create a new trade
export const createTrading = async (req, res) => {
  let trade;
  try {
    const { userId, currencyPair, amount, price, orderType } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    if (orderType === "limit" && (!price || price <= 0)) {
      return res.status(400).json({ error: "Invalid price for limit order" });
    }

    // Create a new trade record
    trade = new Trade({
      userId,
      currencyPair,
      amount,
      price: orderType === "market" ? null : price,
      orderType,
      status: "pending", // Initial status
    });

    // Simulate transaction creation
    // const txParams = {
    //   from: account.address,
    //   to: userId,
    //   value: web3.utils.toWei(amount.toString(), "ether"),
    //   gas: 21000,
    // };

    try {
      //   const signedTx = await web3.eth.accounts.signTransaction(
      //     txParams,
      //     process.env.PRIVATE_KEY
      //   );
      //   const receipt = await web3.eth.sendSignedTransaction(
      //     signedTx.rawTransaction
      //   );

      //   // Update trade with transaction details
      //   trade.transactionHash = receipt.transactionHash;
      trade.status = "processing";
      await trade.save();

      //   res.json({
      //     success: true,
      //     message: "Trade initiated successfully",
      //     transactionHash: receipt.transactionHash,
      //     tradeId: trade._id,
      //   });

      //   // Monitor transaction status
      //   monitorTransaction(receipt.transactionHash, trade._id);
    } catch (error) {
      trade.status = "failed";
      await trade.save();
      throw error;
    }
  } catch (error) {
    console.error("Trade creation error:", error);
    res.status(500).json({
      error: "Failed to create trade",
      details: error.message,
    });
  }
};

// Monitor transaction status
async function monitorTransaction(hash, tradeId) {
  try {
    const receipt = await web3.eth.getTransactionReceipt(hash);
    const status = receipt.status ? "confirmed" : "failed";

    await Trade.findByIdAndUpdate(tradeId, { status });
    console.log(`Transaction ${hash} is ${status}`);
  } catch (error) {
    console.error("Transaction monitoring error:", error);
    await Trade.findByIdAndUpdate(tradeId, { status: "failed" });
  }
}

// Fetch a single trade by ID
export const tradingControllerId = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });
    }
    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trade status" });
  }
};

// Fetch user's transaction and order history
export const fetchUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const trades = await Trade.find({ userId }).sort({ createdAt: -1 });

    if (!trades.length) {
      return res.status(404).json({ error: "No trade history found" });
    }

    res.json({ trades });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trade history" });
  }
};

// Fetch price chart data
export const fetchPriceData = async (req, res) => {
  try {
    // Simulated data; replace with actual integration for price trends
    const priceData = [
      { time: "2024-11-16", price: 50 },
      { time: "2024-11-17", price: 52 },
      { time: "2024-11-18", price: 55 },
    ];
    res.json(priceData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price data" });
  }
};
