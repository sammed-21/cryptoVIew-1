import Web3 from "web3";

import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line no-undef
const endpointUrl = process.env.INFURA_URL;
const httpProvider = new Web3.providers.HttpProvider(endpointUrl);
const web3Client = new Web3(httpProvider);

// Token ABI
const tokenAbi = [
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// Function to get token balance
export const getTokenBalance = async (req, res) => {
  const { tokenAddress, walletAddress } = req.body;

  // Validate input
  if (!tokenAddress || !walletAddress) {
    return res
      .status(400)
      .json({ error: "Token address and wallet address are required" });
  }

  try {
    // Initialize token contract
    const tokenContract = new web3Client.eth.Contract(tokenAbi, tokenAddress);

    // Fetch decimals
    const decimals = await tokenContract.methods.decimals().call();

    // Fetch balance
    const result = await tokenContract.methods.balanceOf(walletAddress).call();

    // Convert Wei to Ether and handle the BigInt safely
    const resultInEther = web3Client.utils.fromWei(result.toString(), "ether");

    // Return the formatted balance
    res.json({ success: true, balance: resultInEther });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: `Failed to retrieve token balance: ${error.message}` });
  }
};
