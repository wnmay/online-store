import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const postProducts = async (req,res)=>{
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
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Product not found" });
	}
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({success:true, message: "product deleted" });
	} catch (error) {
		res.status(500).json({success:false, message: 'internal server error'})
	}
}

export const getProduct = async (req,res)=>{
	try {
		const products = await Product.find();
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		res.status(500).json({ success: false, message: "internal server Error" });
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Product not found" });
	}
	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "internal server error" });
	}
};