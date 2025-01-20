import { Router } from "express";
import {
  createTrading,
  tradingControllerId,
} from "../controllers/tradingController.js";

const router = Router();

router.post("/", createTrading);

router.get("/:id", tradingControllerId);

export default router;
