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
      <div className='fixed inset-0 z-50 flex items-center justify-center blurEffect'
        onClick={() => handleCancel()}
      >
        <div className='bg-page p-2 rounded-xl min-h-40 flex flex-col justify-center items-center gap-2 font-semibold'
          onClick={(e) => e.stopPropagation()}
        >
          <p className='text-gray-800 font-semibold'>Are you sure you want to {text}?</p>
          <div className='flex bg-amber-00'>
            <button
              className='hoverBase btn mx-2 text-danger font-bold'
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className='hoverBase btn mx-2 font-semibold text-success'
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
