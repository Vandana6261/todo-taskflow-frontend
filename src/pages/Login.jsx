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
            <div className="w-full min-h-screen bg-page2 fixed z-0 flex justify-center items-center p-4">
                {isLoading ? 
                    <Loader />   
                    : 
                    <div className="flex flex-col gap-1 w-full max-w-[450px] md:w-[40vw] bg-page rounded-xl border border-gray-400 px-4 py-4 ">
                        <form
                            className="flex flex-col gap-2 max-h-[70vh] relative "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email"
                                    className="text-md font-semibold"
                                >Email: </label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={formData.email}
                                    className="inputBase2 px-2 py-1"
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="password"
                                    className="text-md font-semibold"
                                >Password: </label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={formData.password}
                                    minLength={8}
                                    maxLength={20}
                                    className="inputBase2 px-2 py-1"
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                />
                                {errors.password && <p className="text-sm text-danger">{errors.password}</p>}
                            </div>
                            {errors.loginError && <p className="text-sm text-danger">{errors.loginError}</p>}

                            <button type='submit' className='btn hoverBase border-none w-fit py-2 px-4 text-white font-semibold bg-button rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'>Login</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Login
