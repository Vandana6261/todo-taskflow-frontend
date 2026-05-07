import React, { useState, useRef, useEffect } from 'react'
import useTodoContext from '../context/TodoContext';
import { useNavigate } from 'react-router-dom';

function VarifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);
  const token = localStorage.getItem("token")

  const {varifyOtp} = useTodoContext();
  const navigate = useNavigate()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Reset error state when user starts typing again
    if (isError) setIsError(false);

    // Move to next input if value is entered
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleAction = async () => {
    const fullOtp = otp.join("");

    const isVarified = await varifyOtp(fullOtp);
    
    if(!isVarified.success) {

    }
    else {
      navigate("/dashboard")
    }
    // if (isError) {
    //   // Resend Logic
    //   setOtp(new Array(6).fill(""));
    //   setIsError(false);
    //   inputRefs.current[0].focus();
    //   console.log("OTP Resent");
    // } else {
    //   // Verification Logic (Simulated)
    //   if (fullOtp !== "123456") {
    //     setIsError(true);
    //   } else {
    //     alert("Verified Successfully!");
    //   }
    // }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-500/30 text-slate-900">
      <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-md w-full text-center">
        
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 text-slate-800">Verification Code</h2>
        <p className="text-slate-500 mb-8 text-sm font-medium">
          We sent a 6-digit code to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-14 text-center text-xl font-semibold rounded-xl border transition-all outline-none
                ${isError 
                  ? 'border-red-400 bg-red-50 text-red-600' 
                  : 'border-slate-200 bg-slate-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100'}`}
            />
          ))}
        </div>

        {/* Dynamic Action Button */}
        <button
          onClick={handleAction}
          className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-300 active:scale-[0.98]
            ${isError 
              ? 'bg-slate-100 text-indigo-600 hover:bg-slate-200 border border-slate-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}
        >
          {isError ? 'Resend Code' : 'Verify Identity'}
        </button>

        {/* Footer Link */}
        <p className="mt-6 text-sm text-slate-400">
          Didn't receive the code? <span className="text-indigo-600 cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
}

export default VarifyOtp
