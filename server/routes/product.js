import express from "express";
import { addProduct, getProducts } from "../controllers/product.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
export default router;
