
import React from 'react';
import { FiCheckSquare, FiShield, FiZap, FiLayout } from "react-icons/fi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
// import Preview from '../components/Preview';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen page-bg selection:bg-blue-100 ">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          V2.0 is now live with Drag & Drop
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
          Simplify your workflow. <br />
          <span className="text-accent">Focus on what matters.</span>
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          The professional task management tool designed for developers and high-achievers. 
          Organize projects, track progress with Kanban-style boards, and stay ahead of deadlines.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate("/signUp")}
            className="flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full shadow-[0px_10px_20px_rgba(0,25,247,0.3)] hover:shadow-[0px_15px_25px_rgba(0,25,247,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            Get Started for Free <HiOutlineArrowRight />
          </button>
          <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition-all">
            View Demo
          </button>
        </div>

        {/* Abstract UI Preview */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-2 transform rotate-1 hover:rotate-0 transition-transform duration-700">
           <div className="bg-slate-50 rounded-xl p-4 h-72 md:h-102 flex gap-4">
              {/* <Preview /> */}
           </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<FiLayout className="text-blue-500" />}
              title="Kanban Architecture"
              desc="Visualize your work from 'Pending' to 'Complete' with our intuitive drag-and-drop interface."
            />
            <FeatureCard 
              icon={<FiZap className="text-amber-500" />}
              title="Lightning Performance"
              desc="Built with React 19 and Tailwind CSS v4 for a smooth, lag-free management experience."
            />
            <FeatureCard 
              icon={<FiShield className="text-emerald-500" />}
              title="Premium UI/UX"
              desc="Eye-friendly dark/light modes designed specifically for long-duration productivity sessions."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>&copy; 2026 TaskFlow. All rights reserved. Professional Productivity Suite.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default Home;


























































// import React, { useState } from 'react'
// import SignUp from './SignUp';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//     const [isSignUp, setIsSignUp] = useState(false);
//     const [isLogIn, setIsLogIn] = useState(false);
//   return (
//     <>
//       <div className='max-w-[1400px] mx-auto h-screen  bg-[#ceceec48]'>
//         <h1>Dashboard</h1>
//         <p>A simple way to manage your todo and all of the things, You don't need to remember all the think. Now it's our priority to recall you when do to do what, Just one time tell to me and I will tell you on the time</p>
//         {/* <button
//           className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
//           onClick={}
//         >
//           Sign Up
//         </button>
//         <button
//           className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
//           onClick={() => setIsLogIn(!isLogIn)}
//         >
//           Login
//         </button> */}
//       </div>

//       {/* <div>
//         <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
//       </div> */}
//     </>
//   )
// }

// export default Home
