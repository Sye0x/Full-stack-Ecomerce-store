import express from "express";
import {
  addCategory,
  editCategory,
  getCategory,
  removeCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/", addCategory);
router.get("/", getCategory);
router.delete("/", removeCategory);
router.put("/", editCategory);

export default router;
