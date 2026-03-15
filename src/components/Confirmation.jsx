import React from 'react'
import useTodoContext from '../context/TodoContext';
import { MdDeleteForever } from "react-icons/md";

function Confirmation({ task, taskId, setConfirmDelete }) {

  const { deleteTask } = useTodoContext()

  const handleCancel = () => {
    setConfirmDelete(prev => !prev);
  }

  const handleDelete = () => {
    deleteTask(taskId, { ...task, isDeleted: true });
    setConfirmDelete(prev => !prev);
  }
  return (
    <>
      <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-black/40 backdrop-blur-sm'
        onClick={() => handleCancel()}
      >
        <div className='bg-[#ffffff]  p-2 rounded-xl min-h-40 flex flex-col justify-center items-center gap-2 font-semibold'
          onClick={(e) => e.stopPropagation()}
        >
          <p className='text-gray-800 font-semibold'>Are you sure you want to delete this?</p>
          <div className='flex bg-amber-00'>
            <button
              className='hoverBase btn mx-2 bg-blue-300/20 text-blue-600'
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className='hoverBase btn mx-2 font-semibold bg-red-300/20 text-red-600 flex items-center gap-1'
              onClick={() => handleDelete()}
            >
              <span>
                <MdDeleteForever />
              </span>
              <span>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Confirmation
