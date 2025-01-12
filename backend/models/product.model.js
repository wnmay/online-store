import mongoose from 'mongoose';
import User from './user.model.js';

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
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User,
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;