import React from 'react';

const Loader = ({message = "Loading"}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-transparent animate-in fade-in duration-700">
      
      {/* Visual Ripple Animation */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        {/* Ripples */}
        <div className="absolute inset-0 border-2 border-blue-600/30 rounded-full animate-[ping_3s_linear_infinite]"></div>
        <div className="absolute inset-0 border-2 border-blue-600/20 rounded-full animate-[ping_3s_linear_infinite_1s]"></div>
        <div className="absolute inset-0 border-2 border-blue-600/10 rounded-full animate-[ping_3s_linear_infinite_2s]"></div>
        
        {/* Core Circle with Icon */}
        <div className="z-10 w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,25,247,0.4)]">
          <svg 
            width="35" 
            height="35" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-md px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">
          {message}
        </h2>
        <p className="text-gray-500 font-medium mb-6 leading-relaxed">
          {/* We're analyzing your tasks and categories to optimize your workflow. */}
          Please wait for a moment
        </p>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full animate-progress-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;