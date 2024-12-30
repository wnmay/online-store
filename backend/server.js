import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.post("/api/products",async (req,res)=>{
    const product = req.body;
	if (!product.name || !product.price || !product.image ) {
		return res.status(400).send('All fields are required.');
	}
	const addedProduct = new Product(product);
	try {
		await addedProduct.save();
		res.status(201).json({success:true, data: addedProduct });
	} catch (error) {
		res.status(500).json({success:false, message: 'Internal server error'})
	}
})

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});

