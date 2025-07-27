import express from "express";

import { getBlocks } from "../controllers/blockControllers";

const router = express.Router();

router.get("/", getBlocks);

export default router;
