//Config express
import express, { json } from "express";
import { config } from "dotenv";
import { env } from "process";
import workoutRoutes from "./routes/workouts.js";
// import tradingRoutes from "./routes/tradingRoutes.js";
import usersRoutes from "./routes/users.js";
import nftMetadataRoutes from "./routes/nftMetadataRoutes.js";
import transactionsRoutes from "./routes/Transactions.js";
import tokenBalanceRoutes from "./routes/tokenBalanceRoutes.js";
// import userPortfolio from "./routes/userPortfolio.js";
import { connect } from "mongoose";
import cors from "cors";

config();

const app = express();
// configuration cors
// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));

// middleware pour parser le json
app.use(json());

// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);
// app.use("/api/portfolio/", userPortfolio);
app.use("/api/transactions/", transactionsRoutes);
// app.use("/api/trade", tradingRoutes);
app.use("/api/users/", usersRoutes);
app.use("/api/nft", nftMetadataRoutes);
app.use("/api/token/balance", tokenBalanceRoutes);

//connect to db et lancement du server
connect(env.MONG_URI)
  .then(() => {
    // listen requests
    console.log(`connected to db`);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(env.PORT, () => {
  console.log(`listening on port ${env.PORT}`);
});
