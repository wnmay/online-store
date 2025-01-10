import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const registerUser = async (req,res) =>{
    const {email,password,username} = req.body;
    if(!email || !password || !username){
        res.status(400).send('All fields are required.');
        return;
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400).send("This email has already registered")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new User({
        email: email,
        password: hashedPassword,
        username: username
    })
    try {
        await user.save()
        res.status(201).json({success:true, data: user });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error'})
    }
}