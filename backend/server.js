import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: "*",
  }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)

if(process.env.NODE_ENV === "production"){
	app.use(express.static(path.join(__dirname,"../frontend/dist")))

	app.get("*",(req,res)=>{
		res.sendFile(path.resolve(__dirname,"../frontend/dist","index.html"));
	})
}
app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});


