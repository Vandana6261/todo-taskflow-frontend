import React, { useActionState, useState } from "react";
import { MdCancel } from "react-icons/md";
import useTodoContext from "../context/TodoContext";
import { redirect, useNavigate } from 'react-router-dom';


function SignUp() {
  const { registerUser } = useTodoContext();

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
  
 

  const handleBlur = (e) => {
    const {name, value} = e.target;
    const newError = {};
    console.log(name, value)
    let errorMessage = null;
    if(name == 'firstName') {
      if(!value) {
        errorMessage  = "Please Provide some value"
      } else if(!pattern.test(value)) {
        errorMessage = "Don't use number of special character in name"
      }
    }
    if(name == 'lastName') {
      if(!value) {
        errorMessage  = "Please Provide some value"
      } else if(!pattern.test(value)) {
        errorMessage = "Don't use number of special character in name"
      }
    }
    if(name == 'email') {
      if(!value) {
        errorMessage  = "Please Provide some value"
      } else if(!emailPattern.test(value)) {
        errorMessage = "Please give us valid email"
      }
    }
    if(name == 'password') {
      if(!value) {
        errorMessage  = "Please Provide some value"
      } else if(!passwordPattern.test(value)) {
        errorMessage = "Please use strong password, Password should have atleast 1 uppercase, 1 special character, 1 numeric val"
      }
    }
    if(name == 'mobileNo') {
      if(!value) {
        errorMessage  = "Please Provide some value"
      }
    }

    console.log(errorMessage);
    setErrors(prev => {
      const updatedError = {...prev};
      if(errorMessage) {
        updatedError[name] = errorMessage;
      } else {
        delete updatedError[name];
      }
      return updatedError;
    })

    if(!errorMessage) {
      setFormData({...formData, [name]: value})
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(Object.keys(errors).length > 0) {
      console.log("Please fill valid values in all of the field");
      return;
    }
    // const response = registerUser(formData);
    const response = await registerUser(formData);
    // console.log(formData)
    if(response) {
      redirect("/dashboard")
    }
    console.log("Form submitted")
  }

  return (
    <>
      <div className="w-full min-h-screen fixed top-0 z-0  flex justify-center items-center bg-gradient-to-br from-white to-blue-500/30">
        <div className="flex flex-col gap-1 w-[40vw] bg-[#ffffff] rounded-xl border border-gray-400 px-4 py-4 ">
          <h2 className="text-2xl text-center font-bold">Sign Up</h2>
          <form
            className="flex flex-col gap-2 max-h-[70vh] relative "
            onSubmit={(e) => handleSubmit(e)}
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
                onBlur={(e) => handleBlur(e)}
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
                className="inputBase2 px-2 py-1"
                onBlur={(e) => handleBlur(e)}
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
                className="inputBase2 px-2 py-1"
                onChange={(e) => handleChange(e)}
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
                minLength={8}
                maxLength={20}
                className="inputBase2 px-2 py-1"
                onChange={(e) => handleChange(e)}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mobileNo"
                className="text-md font-semibold"
              >Mobile No: </label>
              <input
                type="text"
                placeholder="Enter FirstName"
                name="mobileNo"
                 minLength={10}
                 maxLength={10}
                className="inputBase2 px-2 py-1"
                onChange={(e) => handleChange(e)}
              />
              {errors.mobileNo && <p className="text-sm text-red-600">{errors.mobileNo}</p>}
            </div>

            <button className='btn hoverBase border-none w-fit py-2 px-4 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
