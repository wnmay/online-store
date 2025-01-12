import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ()=>{
    const [showPassword,setShowPassword] = useState(false);
    return(
        <div className="max-w-lg mx-auto m-8 bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">Login</h2>
        <form className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                className="input input-bordered w-5/6 mt-2"
                required
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex gap-8">
            <input
                type={showPassword? "text":"password"}
                name="password"
                className="input input-bordered w-5/6 mt-2"
                required
            />
            <button onClick={(e)=>{e.preventDefault(); setShowPassword(!showPassword);}}>
                {showPassword? "hide":"view"}
            </button>
            </div>
            </div>
            <div className="flex justify-between gap-4 mt-6">

            <div className="flex gap-1">
            <div>
            Don't have an account? 
            </div>
            <Link
            to="/register"
            className="text-primary hover:underline"
            >
            Register
          </Link>

                </div>
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Login
          </button>
        </div>
        </form>
        </div>

    )
}

export default Login;