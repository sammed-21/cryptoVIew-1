import { Router } from "express";
import { getNftMetadata } from "../controllers/nftMetadataController.js";

const router = Router();

router.post("/", getNftMetadata);

export default router;
