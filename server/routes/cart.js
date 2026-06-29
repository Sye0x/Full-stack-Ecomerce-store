import express from "express";
import { addItem, removeItem, getItem } from "../controllers/cart.js";

const router = express.Router();

router.get("/", (req, res) => getItem(req, res));
router.post("/", async (req, res) => addItem(req, res));
router.post("/decrease", async (req, res) => removeItem(req, res));

export default router;
