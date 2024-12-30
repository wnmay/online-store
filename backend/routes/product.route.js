import express from 'express'
import { deleteProduct, postProducts } from '../controllers/products.controller.js'

const router = express.Router()

router.post("/",postProducts)
router.delete("/:id", deleteProduct)

export default router;