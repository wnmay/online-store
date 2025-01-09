import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        Types: String,
        require: true
    },
    password:{
        Types: String,
        require: true
    },
    username:{
        Types: String,
        require: true
    }

},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;