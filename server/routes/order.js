import express from "express";
import {
  createOrder,
  getOrder,
  getUserOrder,
  setStatus,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", async (req, res) => createOrder(req, res));
router.post("/statusUpdate", async (req, res) => setStatus(req, res));
router.get("/user", async (req, res) => getUserOrder(req, res));
router.get("/", async (req, res) => getOrder(req, res));

export default router;
