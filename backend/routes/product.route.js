import express from 'express'
import { deleteProduct, getProduct, postProducts, updateProduct } from '../controllers/products.controller.js'
import upload from '../middleware/multerConfig.js'

const productRouter = express.Router()

productRouter.post("/products",upload.single('image'),postProducts)
productRouter.delete("/products/:id", deleteProduct)
productRouter.get("/products",getProduct)
productRouter.put("/products/:id",upload.single('image'),updateProduct)

export default productRouter;