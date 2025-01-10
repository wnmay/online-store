import express from 'express'
import { deleteProduct, getProduct, postProducts, updateProduct } from '../controllers/products.controller.js'
import upload from '../middleware/multerConfig.js'

const productRouter = express.Router()

productRouter.post("/",upload.single('image'),postProducts)
productRouter.delete("/:id", deleteProduct)
productRouter.get("/",getProduct)
productRouter.put("/:id",upload.single('image'),updateProduct)

export default productRouter;