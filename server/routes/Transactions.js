import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionsController.js";

// import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// router.use(requireAuth);

router.post("/", createTransaction);

router.get("/", getTransactions);

export default router;
