import React, { useState } from 'react'
import useTodoContext from '../context/TodoContext'
import { redirect, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'
import { useAuthContext } from '../context/AuthContext';

function Login() {
    const { loginUser } = useTodoContext()
    // const {user, setUser} = useAuthContext()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear errors as user types
        if (errors[name] || errors.loginError) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                delete newErrors.loginError;
                return newErrors;
            });
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = null;
        
        if (name === 'email') {
            if (!value) {
                errorMessage = "Please Provide some value";
            } else if (!emailPattern.test(value)) {
                errorMessage = "Please give us valid email";
            }
        }
        if (name === 'password') {
            if (!value) {
                errorMessage = "Please Provide some value";
            } else if (!passwordPattern.test(value)) {
                errorMessage = "Please use strong password, Password should have atleast 1 uppercase, 1 special character, 1 numeric val";
            }
        }

        if (errorMessage) {
            setErrors(prev => ({ ...prev, [name]: errorMessage }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate all fields before submission
        const newErrors = {};
        if (!formData.email) newErrors.email = "Please Provide some value";
        else if (!emailPattern.test(formData.email)) newErrors.email = "Please give us valid email";
        
        if (!formData.password) newErrors.password = "Please Provide some value";
        else if (!passwordPattern.test(formData.password)) newErrors.password = "Please use strong password, Password should have atleast 1 uppercase, 1 special character, 1 numeric val";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        const loginResponse = await loginUser(formData);
        console.log(loginResponse, "loginResponse")
        setIsLoading(false)
        if (!loginResponse) {
            setErrors({loginError: "Network Error: Could not connect to the backend server. Please try again."});
            return;
        }

        if(loginResponse?.success) {
            // setUser(loginResponse.user)
            navigate("/dashboard")
        }
        else {
            let loginError = null;
            if(loginResponse?.message == "User don't exists") {
                loginError = "User doesn't exists with this email please signUp first";
                setErrors({loginError});
            }
            else if(loginResponse?.message == "Password doesn't match") {
                loginError = loginResponse.message;
                setErrors({loginError});
            } else {
                setErrors({loginError: "An error occurred during login. Please try again."});
            }
        }
    }

    return (
        <>
            {/* Outer container with a gentle light gradient background */}
            <div className="w-full min-h-screen  fixed z-0 flex bg-page justify-center items-center p-4">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="flex flex-col gap-4 w-full max-w-md md:max-w-[40vw] bg-header/40 bg-opacity-80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-muted text-center mb-4">Welcome Back</h2>
                        <form
                            className="flex flex-col gap-4 text-muted"
                            onSubmit={handleSubmit}
                        >
                            {/* Email Field */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium  mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="inputBase2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                />
                                {errors.email && <p className="mt-1 text-xs text-danger/30">{errors.email}</p>}
                            </div>
                            {/* Password Field */}
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium text-muted mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={formData.password}
                                    minLength={8}
                                    maxLength={20}
                                    onChange={handleChange}
                                    className="inputBase2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                />
                                {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
                            </div>
                            {/* General error */}
                            {errors.loginError && <p className="text-center text-sm text-danger mb-2">{errors.loginError}</p>}
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-button hover:bg-button/80 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login
