import { Router } from "express";
import { getTokenBalance } from "../controllers/tokenBalanceController.js";

const router = Router();

router.post("/", getTokenBalance);

export default router;
