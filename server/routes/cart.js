import express from "express";
import { addItem, removeItem, getItem } from "../controllers/cart.js";

const router = express.Router();

router.get("/", getItem);
router.post("/", addItem);
router.post("/decrease", removeItem);

export default router;
