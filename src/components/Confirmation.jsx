import React from 'react'
import useTodoContext from '../context/TodoContext';
import { MdDeleteForever } from "react-icons/md";

function Confirmation({ setIsOpen, handleConfirmation, text="perform this action" }) {   // handleConfirmation is a function to performa task

  const { deleteTask } = useTodoContext()

  const handleCancel = () => {
    setIsOpen(prev => !prev);
  }


  const handleConfirm = () => {
    handleConfirmation();
    setIsOpen(prev => !prev)
  }
  return (
    <>
      <div className='blurEffect min-w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center z-999'
        onClick={() => handleCancel()}
      >
        <div className='bg-card p-2 rounded-xl min-h-40 max-w-[500px]  flex flex-col justify-center items-center gap-2 font-semibold text-text'
          onClick={(e) => e.stopPropagation()}
        >
          <p className='font-semibold'>Are you sure you want to {text}?</p>
          <div className='flex bg-amber-00'>
            <button
              className='hoverBase btn mx-2 text-danger bg-danger/20 font-bold'
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className='hoverBase btn mx-2 font-semibold text-success bg-success/20'
              onClick={() => handleConfirm()}
            >
              <span>
                Confirm
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirmation
