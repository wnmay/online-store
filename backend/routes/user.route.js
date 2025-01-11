import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/users.controller.js'
import { protect } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/me",protect,getUser)

export default userRouter;