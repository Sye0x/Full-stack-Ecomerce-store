import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/product.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.put("/", upload.single("image"), editProduct);
router.delete("/", (req, res) => deleteProduct(req, res));
export default router;
