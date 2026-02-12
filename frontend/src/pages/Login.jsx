import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post("/api/users/login", formData);
            const token = response.data.accessToken;
            if (token) {
                const savedToken = token.startsWith("Bearer") ? token : `Bearer ${token}`
                localStorage.setItem("accessToken", savedToken);

                alert("Login successful");
                navigate("/");
                window.location.reload();
            } else {
                alert("Token not found.");
                console.log("Response:", response);
            }
        }catch (error) {
            console.error("Login Error:", error);
            alert("Login Failed");
        }
    }
    return(
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-200">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className ="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Login
                    </h1>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="Enter username"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login
                        </button>

                        <p className="text-sm font-light text-gray-500">
                            Are you not User?{" "}
                            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}