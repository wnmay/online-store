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