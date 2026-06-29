import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiCheckSquare } from "react-icons/fi";
import ThemeSwitcher from "../components/ThemeSwitcher";
import useTodoContext from "../context/TodoContext";
import { createPortal } from "react-dom";
import Confirmation from "../components/Confirmation";

function Landing() {
  const navigate = useNavigate();
  const {logout} = useTodoContext()
  const [isOpen, setIsOpen] = useState(false)

  const buttonStyle = `
    btn hoverBase border-none w-auto py-2 px-4 font-semibold rounded-full hover:shadow-[0px_0px_20px_var(--color-btnShadow)]
  `;
  const buttonDark = `
    hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]
  `;

  const handleLogout = async () => {
    await logout();
    navigate("/")
  }

  return (
    <>
      <header className="w-full text-center bg-header flex flex-col sm:flex-row justify-between items-center p-4 z-100 relative top-0 gap-4">
        <div className="flex items-center justify-center gap-3 text-2xl font-bold text-blue-500">
          <FiCheckSquare className="text-3xl" />
          <h2 className="cursor-pointer" onClick={() => navigate("/")}>TaskFlow </h2>
        </div>

        <div className="flex items-center gap-4 text-muted">
          <NavLink to="/" className={buttonStyle}>Home</NavLink>
          <NavLink to="/login" className={buttonStyle} onClick={() => navigate("/login")}>Login </NavLink>
          <NavLink to="/signUp" className={buttonStyle} onClick={() => navigate("/signUp")}>SignUp</NavLink>
          <button className={buttonStyle} onClick={() => setIsOpen(!isOpen)}>Logout</button>
        </div>
        
        <div className="flex items-center gap-4 text-muted">
          <button className={buttonStyle}>
          <ThemeSwitcher />
          </button>
          <div>user</div>
        </div>
      </header>
      <Outlet />
      <div>{createPortal(isOpen ? <Confirmation setIsOpen={setIsOpen} handleConfirmation={handleLogout} text={"Logout"}  /> : "", document.body)}</div>
    </>
  );
}

export default Landing;
