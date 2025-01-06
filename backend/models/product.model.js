import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    tag:{
        type: String,
        enum: ["Electronics", "Clothing", "Furniture", "Stationery", "Other"],
        require: "true",
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;