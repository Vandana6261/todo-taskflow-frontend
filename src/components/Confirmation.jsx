import React from 'react'
import useTodoContext from '../context/TodoContext';

function Confirmation({task, taskId, setConfirmDelete}) {

    const {deleteTask} = useTodoContext()

    const handleCancel = () => {
        setConfirmDelete(prev => !prev);
    }

    const handleDelete = () => {
        deleteTask(taskId, {...task, isDeleted: true});
        setConfirmDelete(prev => !prev);
    }
  return (
    <>
      <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center  backdrop-blur-sm'
        onClick={() => handleCancel()}
      >
        <div className='bg-modal-color p-2 rounded min-h-40 flex flex-col justify-center items-center gap-2 font-semibold'
            onClick={(e) => e.stopPropagation()}
        >
            <p className='text-gray-800 font-semibold'>Are you sure you want to delete this?</p>
            <div>
              <button
              className='hoverBase btn mx-2 bg-gray-400 text-red-600'
              onClick={() => handleCancel()}
              >
                  Cancel
              </button>
              <button
              className='hoverBase btn mx-2 font-semibold bg-blue-600/10 text-[#4F39F6]'
              onClick={() => handleDelete()}
              >
                  Confirm
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Confirmation
