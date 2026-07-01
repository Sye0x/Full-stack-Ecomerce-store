import express from "express";
import {
  createOrder,
  getOrder,
  getUserOrder,
  setStatus,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/statusUpdate", setStatus);
router.get("/user", getUserOrder);
router.get("/", getOrder);

export default router;
