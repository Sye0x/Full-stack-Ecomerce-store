import express from "express";
import { addCategory, getCategory } from "../controllers/category.js";

const router = express.Router();

router.post("/", async (req, res) => addCategory(req, res));
router.get("/", async (req, res) => getCategory(req, res));

export default router;
