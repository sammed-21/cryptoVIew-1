import Web3 from "web3";
import nftMeta from "../models/nftMeta.js";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line no-undef
const endpointUrl = process.env.INFURA_URL;
const httpProvider = new Web3.providers.HttpProvider(endpointUrl);
const web3Client = new Web3(httpProvider);
export const getNftMetadata = async (req, res) => {
  const { contractAddress, tokenId } = req.body;

  try {
    const nftContract = new web3Client.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "tokenURI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      contractAddress
    );
    const tokenURI = await nftContract.methods.tokenURI(tokenId).call();

    // Fetch metadata from token URI (usually stored on IPFS or a web server)
    const ipfsURL = addIPFSProxy(tokenURI);
    const metadataResponse = await fetch(ipfsURL);

    // Check if response is OK
    if (!metadataResponse.ok) {
      throw new Error(
        `Failed to fetch metadata. Status: ${metadataResponse.status}`
      );
    }

    // Verify Content-Type is JSON
    const contentType = metadataResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid content type, expected application/json");
    }

    const metadata = await metadataResponse.json();
    console.log("NFT Metadata:", metadata);

    // Store metadata in MongoDB
    const nft = new nftMeta({ contractAddress, tokenId, metadata });
    await nft.save();

    res.json({ success: true, metadata });
  } catch (error) {
    console.error("Error retrieving NFT metadata:", error);
    res.status(500).json({ error: "Failed to retrieve NFT metadata" });
  }
};

function addIPFSProxy(ipfsHash) {
  const URL = "https://gateway.pinata.cloud/ipfs/";
  const hash = ipfsHash.replace(/^ipfs?:\/\//, "");
  const ipfsURL = URL + hash;

  return ipfsURL;
}
