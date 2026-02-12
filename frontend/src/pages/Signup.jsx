import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function Signup(){
    const navigate = useNavigate();
    const[formData, setFormData]=useState({username:"", password:"", nickname:"", email: ""}) ;

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // 백엔드 회원가입 API 호출 (POST /api/users/signup)
            await axios.post("/api/users/signup", formData);

            alert("Sign up successfully!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Sign up failed!");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        SignUp
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="user id"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        {/* 비밀번호 */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                 Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Nickname
                            </label>
                            <input
                                type="text"
                                name="nickname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="활동명 입력"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}