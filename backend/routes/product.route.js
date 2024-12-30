import express from 'express'
import { deleteProduct, getProduct, postProducts } from '../controllers/products.controller.js'

const router = express.Router()

router.post("/",postProducts)
router.delete("/:id", deleteProduct)
router.get('/',getProduct)

export default router;