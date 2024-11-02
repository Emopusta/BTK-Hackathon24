import express from "express";
import { sendPrompt } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/send-prompt", sendPrompt);

export default router;