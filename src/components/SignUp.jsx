import React, { useState } from 'react'
import { MdCancel } from "react-icons/md";

function SignUp({ isSignUp, setIsSignUp }) {
    const [formData, setFormData] = useState
        ({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobileNo: null
        })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobileNo: ""
        })
    }

    const handleCancel = () => {
        setIsSignUp(!isSignUp);

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobileNo: ""
        })
    }
    return (
        <>
            {isSignUp &&
                <div className='min-w-screen min-h-screen flex justify-center items-center bg-black/10 backdrop-blur-sm z-999 fixed top-0 '
                    onClick={() => {
                        setIsSignUp(!isSignUp)
                    }}
                >
                    <div
                        className="flex flex-col gap-1 w-[90%] min-h-full sm:w-1/2 modal bg-[#ffffff] rounded-xl p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Heading */}
                        <div className='flex-1 border-b border-gray-300 px-4 py-2 flex justify-between'>
                            <h2 className='text-2xl text-center'>Sign Up</h2>
                            <span
                                className='h-8 w-8 text-2xl rounded-full bg-gray-400/20 flex justify-center items-center cursor-pointer hoverBase'
                                onClick={(e) => handleCancel(e)}
                            ><MdCancel /></span>
                        </div>

                        <form
                            className='flex flex-col gap-2 justify-center'
                        >
                            <div>
                                <label htmlFor="firstName" className="text-md font-semibold">FirstName: </label>
                                <input 
                                    type="text" 
                                    id='firstName'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='enter your first name'
                                    className="inputBase px-2 py-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="text-md font-semibold">LastName: </label>
                                <input 
                                    type="text" 
                                    id='lastName'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='enter your last name'
                                    className="inputBase px-2 py-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-md font-semibold">Email: </label>
                                <input 
                                    type="email" 
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='enter your email'
                                    className="inputBase px-2 py-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-md font-semibold">Password: </label>
                                <input 
                                    type="password" 
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={(e) => handleChange(e)}
                                    placeholder='create your password'
                                    className="inputBase px-2 py-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="mobileNo" className="text-md font-semibold">Mobile No. : </label>
                                <input 
                                    type="string" 
                                    id='mobileNo'
                                    name='mobileNo'
                                    value={formData.mobileNo}
                                    onChange={(e) => handleChange(e)}
                                    max={10}
                                    placeholder='enter your mobile No.'
                                    className="inputBase px-2 py-1"
                                />
                            </div>
                            <div className="flex gap-3 self-end mt-2 relative bottom-0">
                                <button
                                    type="button"
                                    onClick={(e) => handleCancel(e)}
                                    className="hoverBase btn mx-2 font-semibold bg-red-300/20 text-red-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="hoverBase btn mx-2 font-semibold bg-green-500/20 text-[#229c09]"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Sign UP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default SignUp
