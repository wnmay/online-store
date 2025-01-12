import express from 'express';
import { deleteProduct, getProduct, postProducts, updateProduct } from '../controllers/products.controller.js';
import upload from '../middleware/multerConfig.js';
import { protect } from '../middleware/auth.js';

const productRouter = express.Router()

productRouter.post("/",protect,upload.single('image'),postProducts)
productRouter.delete("/:id",protect,deleteProduct)
productRouter.get("/",getProduct)
productRouter.put("/:id",protect,upload.single('image'),updateProduct)

export default productRouter;