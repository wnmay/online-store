import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { error } from "console";

export const protect = async (req,res,next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password');
                if (!req.user) {
                    return res.status(401).send("not authorized, user not found");
                }
                next();
            } catch (error) {
                console.error(error);
                return res.status(401).send("not authorized, invalid token");
            }
        } else {
            console.error(error);
            return res.status(401).send("not authorized, no token provided");
        }
}