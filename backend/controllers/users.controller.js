import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res) =>{
    const {email,password,username} = req.body;
    if(!email || !password || !username){
        return res.status(400).send('All fields are required.');
    }
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).send("This email has already registered")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new User({
        email: email,
        password: hashedPassword,
        username: username
    })
    try {
        await user.save();
        const token = generateToken(user._id);
        return res.status(201).json({success:true, 
            data:{
                id: user._id,
                email: user.email,
                username: user.username,
            },token
         });
    } catch (error) {
        return res.status(500).json({success:false, message: 'Internal server error'})
    }
}

export const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success: false, message: 'This email has not been registered.'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = generateToken(user._id);
            return res.status(200).json({success: true, 
                data:{
                    id: user._id,
                    email: user.email,
                    username: user.username,
                },token
            });
        } else {
            return res.status(400).json({success: false, message: 'Wrong password' });
        }   
    } catch (error) {
        return res.status(500).json({success:false, message: 'Internal server error'});
    }
}

export const getUser = async (req,res) =>{
    return res.status(200).json(req.user)
}

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}