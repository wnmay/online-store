import mongoose from "mongoose";
import Product from "../models/product.model.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postProducts = async (req,res)=>{
    const {name,price,tag} = req.body;
	
	if (!req.file) {
		return res.status(400).send("Product image is required.");
	}
	if (!name || !price || !tag) {
		return res.status(400).send('All fields are required.');
	}
	const addedProduct = new Product({
		name: name,
		price: price,
		image: `/uploads/${req.file.filename}`,
		tag: tag
	});
	try {
		await addedProduct.save();
		res.status(201).json({success:true, data: addedProduct });
	} catch (error) {
		res.status(500).json({success:false, message: 'Internal server error'})
	}
}

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
	  return res.status(404).json({ success: false, message: "Invalid product ID" });
	}
	try {
	  const product = await Product.findById(id);
	  const imagePath = path.join(__dirname, "../uploads", path.basename(product.image));
	  await Product.findByIdAndDelete(id);
	  try {
		await fs.unlink(imagePath);
	  } catch (error) {
		console.error("Failed to delete file:", error.message);
	  }
	  res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
	  console.error("Error deleting product:", error);
	  res.status(500).json({ success: false, message: "Internal server error" });
	}
  };

export const getProduct = async (req,res)=>{
    const {tag,sortBy,sortOrder} = req.query;
	try {
        let filter = {};
        if(tag){
            const tagArray = tag.split(',');
            filter = {tag: {$in: tagArray}};
        }
        let sort = {};
        if(sortBy){
            const order = sortOrder === "asc"? 1:-1;
            sort = {[sortBy]: order}
        }
        else{
            sort = {createdAt: -1};
        }
		const products = await Product.find(filter).sort(sort);
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		res.status(500).json({ success: false, message: "internal server Error" });
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Product not found" });
	}

	try {
		let updatedFields = { ...req.body };
		if (req.file) {
			updatedFields.image = `/uploads/${req.file.filename}`;
		}
		const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
