import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCurrentProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get('/:id', getCurrentProduct)
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
