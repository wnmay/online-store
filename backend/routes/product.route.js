import express from 'express'
import { deleteProduct, getProduct, postProducts, updateProduct } from '../controllers/products.controller.js'

const router = express.Router()

router.post("/",postProducts)
router.delete("/:id", deleteProduct)
router.get("/",getProduct)
router.put("/:id",updateProduct)

export default router;