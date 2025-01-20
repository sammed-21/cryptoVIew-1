# CryptoView

## Crypto Trading Platform

This is a simple MERN stack application that displays current prices of cryptocurrencies and allows users to trade them.

**Features:**

- **Real-time Cryptocurrency Prices:** Retrieves and displays the latest prices from a trusted cryptocurrency API.
  <!-- - **Trading Functionality:** Allows users to buy and sell cryptocurrencies. -->
  <!-- - **Secure Authentication:** Uses JWT authentication to protect user accounts. -->
  <!-- - **User Dashboard:** Displays trading history, portfolio, and other relevant information. -->

**Getting Started:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sammed-21/crytpoViewAssig
   ```

2. **Install Dependencies:**

   ```bash
   cd CryptoView
   npm install
   ```

3. **Set up Environment Variables:**

   - Create a `.env` file at the root of the project.
   - Add the following environment variables:
     ```
     SECRET=cryptoviewsecret
     MONG_URI=mongodb+srv://salceanu:f34mqJgy29B61Mm7@labsdatabase.5913czx.mongodb.net/?retryWrites=true&w=majority&appName=labsdatabase
     PORT=5001
     VITE_X_CG_DEMO_API_KEY=CG-1t8kdBZJMA1YUmpjF5nypF6R
     INFURA_URL = "https://sepolia.infura.io/v3/APTKEy"
     RECEIVER_ADDRESS=0x00
     PRIVATE_KEY=0x00
     ```

4. **Start the Server:**

   ```bash
   npm start
   ```

---

### Endpoints

#### 1. **Get NFT Metadata**

- **Endpoint:**

- **Description:**
  Fetches the NFT metadata for a given address.

- **Request Parameters:**
  | Parameter | Type | Description |
  |-------------|--------|---------------------------------|
  | `address` | string | Wallet or contract address (required). |

- **Description:**

1. **Adds a new NFT's metadata using its contract address and token ID**.

- **Example Request:**
- **URL:** `http://localhost:5001/api/nft`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "contractAddress": "0xf1c65417fd15686ec52e2e792b5a970c1b8a6916",
    "tokenId": "8"
  }
  ```

- **Response:**
- **201 Created**
  ```json
  {
    "message": "NFT metadata successfully added",
    "data": {
      "contractAddress": "0xf1c65417fd15686ec52e2e792b5a970c1b8a6916",
      "tokenId": "8",
      "metadata": {
        "name": "New NFT",
        "description": "An amazing new NFT",
        "image": "ipfs://bafybeia.../new-nft.png"
      }
    }
  }
  ```

2. **Simple Cryptocurrency Transaction Tracking:**

- **Example Request:**
- **URL:** `http://localhost:5001/api/transactions?address=0x74D75f13c39014Dd1515758bF66ba46571B73F2E`
- **Method:** `GET`

**3. Token Balance Lookup:**

- **Example Request:**
- **URL:** `http://localhost:5001/api/token/balance`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "tokenAddress": "0x7ae44d9950db7b464b459b7bcf52616b3e91b1d6",
    "walletAddress": "0x647b57D570879b79d8a209d9d7d525488a5Fb50F"
  }
  ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

**Project Structure:**

```
crypto-trading-platform/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── public/
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── server.js
```

**Technologies Used:**

- **Frontend:** React, Redux, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT
- **API:** [Cryptocurrency API](https://example.com/api)

**Contributing:**

Contributions are welcome! Please create a pull request with your changes.

**License:**

This project is licensed under the MIT License.
