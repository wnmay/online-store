import express from 'express'
import { deleteProduct, getProduct, postProducts, updateProduct } from '../controllers/products.controller.js'
import upload from '../middleware/multerConfig.js'

const router = express.Router()

router.post("/",upload.single('image'),postProducts)
router.delete("/:id", deleteProduct)
router.get("/",getProduct)
router.put("/:id",upload.single('image'),updateProduct)

export default router;