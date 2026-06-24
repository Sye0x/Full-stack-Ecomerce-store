import express from "express";
import {
  addCategory,
  editCategory,
  getCategory,
  removeCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/", async (req, res) => addCategory(req, res));
router.get("/", async (req, res) => getCategory(req, res));
router.delete("/", async (req, res) => removeCategory(req, res));
router.put("/", async (req, res) => editCategory(req, res));

export default router;
