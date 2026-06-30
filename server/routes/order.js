import express from "express";
import { createOrder, getUserOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/", async (req, res) => createOrder(req, res));
router.get("/user", async (req, res) => getUserOrder(req, res));

export default router;
