import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import useTodoContext from "../context/TodoContext";
import { redirect, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";

function SignUp() {
  const { registerUser, getProfile, loadTodo, loadCat } = useTodoContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

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
      <div className="w-full min-h-screen fixed mt-0 top-0 z-0  flex justify-center items-center bg-gradient-to-br from-white to-blue-500/30 p-4">
      {isLoading ? 
        <Loader message={"Sending Otp"}/>
      :
        <div className="flex flex-col gap-1 w-full max-w-[500px] md:w-[40vw] bg-[#ffffff] rounded-xl border border-gray-400 px-4 py-4 ">
          <h2 className="text-2xl text-center font-bold">Sign Up</h2>
          <form
            className="flex flex-col gap-2 h-[65vh] overflow-y-auto relative pr-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1"> 
              <label htmlFor="firstName"
                className="text-md font-semibold"
              >FirstName:</label>
              <input
                type="text"
                placeholder="Enter FirstName"
                className="inputBase2 px-2 py-1"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName"
                className="text-md font-semibold"
              >LastName: </label>
              <input 
                type="text" 
                placeholder="Enter LastName" 
                name="lastName" 
                value={formData.lastName}
                className="inputBase2 px-2 py-1"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
            </div>

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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mobileNo"
                className="text-md font-semibold"
              >Mobile No: </label>
              <input
                type="text"
                placeholder="Enter Mobile No"
                name="mobileNo"
                value={formData.mobileNo}
                minLength={10}
                maxLength={10}
                className="inputBase2 px-2 py-1"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.mobileNo && <p className="text-sm text-red-600">{errors.mobileNo}</p>}
            </div>
            {isRegistered && <p className="text-sm text-red-600">Account already exists with this email. Please login</p>}
            <button type='submit' className='btn hoverBase border-none w-fit py-2 px-4 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'>Send OTP</button>
          </form>
        </div>
      }
      </div>
    </>
  );
}

export default SignUp;
