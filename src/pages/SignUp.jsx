import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import useTodoContext from "../context/TodoContext";
import { redirect, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

function SignUp() {
  const { registerUser, getProfile, loadTodo, loadCat } = useTodoContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: ""
  })

  const [errors, setErrors] = useState({})
  const pattern = /^[A-Za-z ]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors as user types
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errorMessage = null;

    if(name === 'firstName') {
      if(!value) errorMessage = "Please Provide some value";
      else if(!pattern.test(value)) errorMessage = "Don't use number of special character in name";
    }
    if(name === 'lastName') {
      if(!value) errorMessage = "Please Provide some value";
      else if(!pattern.test(value)) errorMessage = "Don't use number of special character in name";
    }
    if(name === 'email') {
      if(!value) errorMessage = "Please Provide some value";
      else if(!emailPattern.test(value)) errorMessage = "Please give us valid email";
    }
    if(name === 'password') {
      if(!value) errorMessage = "Please Provide some value";
      else if(!passwordPattern.test(value)) errorMessage = "Please use strong password, Password should have atleast 1 uppercase, 1 special character, 1 numeric val";
    }
    if(name === 'mobileNo') {
      if(!value) errorMessage = "Please Provide some value";
      else if(value.length !== 10) errorMessage = "Mobile number must be 10 digits";
    }

    if (errorMessage) {
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Full validation before submit
    const newErrors = {};
    if(!formData.firstName) newErrors.firstName = "Please Provide some value";
    else if(!pattern.test(formData.firstName)) newErrors.firstName = "Don't use number of special character in name";
    
    if(!formData.lastName) newErrors.lastName = "Please Provide some value";
    else if(!pattern.test(formData.lastName)) newErrors.lastName = "Don't use number of special character in name";
    
    if(!formData.email) newErrors.email = "Please Provide some value";
    else if(!emailPattern.test(formData.email)) newErrors.email = "Please give us valid email";
    
    if(!formData.password) newErrors.password = "Please Provide some value";
    else if(!passwordPattern.test(formData.password)) newErrors.password = "Please use strong password, Password should have atleast 1 uppercase, 1 special character, 1 numeric val";
    
    if(!formData.mobileNo) newErrors.mobileNo = "Please Provide some value";
    else if(formData.mobileNo.length !== 10) newErrors.mobileNo = "Mobile number must be 10 digits";

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    const response = await registerUser(formData);
    setIsLoading(false);
    
    if (!response) {
      setErrors({ email: "Network Error: Could not connect to the backend server. Please try again." });
    }
    else if(!response.success) {
      if (response.message === "User already exists, Please login first") {
        setIsRegistered(true);
      } else {
        setErrors({ email: response.message || "An error occurred during signup" });
      }
    }
    else {
      navigate("/signUp/varifyOtp")
    }
  }

  return (
    <>
      <div className="w-full min-h-screen max-h-auto fixed z-0 flex bg-page justify-center items-center p-4">
        {isLoading ? (
          <Loader message={"Sending Otp"} />
        ) : (
          <div className="flex flex-col gap-2 w-full max-w-md md:max-w-[40vw] bg-card bg-opacity-80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-6">
            <div className='flex-1 border-b border-gray-300 px-4 py-2 flex justify-between' >
              <h2 className="text-2xl font-bold text-muted text-center">Create Account</h2>
            </div>
            
            <form className="flex flex-col gap-4 h-[60vh] p-2 overflow-y-auto text-muted" onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="inputBase"
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
              </div>
              {/* Last Name */}
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="inputBase"
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="inputBase"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="flex gap-1 pr-1">
                  <input
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    minLength={8}
                    maxLength={20}
                    className="inputBase flex-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button type="button" onClick={() => setIsVisible(!isVisible)} className="text-gray-600 border border-header rounded-xl py-1 px-2 bg-page">
                    {isVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>
              {/* Mobile Number */}
              <div className="flex flex-col">
                <label htmlFor="mobileNo" className="text-sm font-medium">Mobile No</label>
                <input
                  type="text"
                  placeholder="Enter Mobile No"
                  name="mobileNo"
                  value={formData.mobileNo}
                  minLength={10}
                  maxLength={10}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="inputBase"
                />
                {errors.mobileNo && <p className="mt-1 text-xs text-red-400">{errors.mobileNo}</p>}
              </div>
              {isRegistered && <p className="text-center text-sm text-red-400 mb-2">Account already exists with this email. Please login</p>}
              <button type="submit" className="btn w-full bg-button hover:bg-button/70 text-white font-semibold rounded-full">
                Send OTP
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default SignUp;
