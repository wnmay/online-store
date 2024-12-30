import express from 'express'
import { postProducts } from '../controllers/products.controller.js'

const router = express.Router()

router.post("/",postProducts)

export default router;