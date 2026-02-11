import React from 'react'
import useTodoContext from '../context/TodoContext';

function Confirmation({taskId, setConfirmDelete}) {

    const {deleteTask} = useTodoContext()

    const handleCancel = () => {
        setConfirmDelete(prev => !prev);
    }

    const handleDelete = () => {
        deleteTask(taskId);
        setConfirmDelete(prev => !prev);
    }
  return (
    <>
      <div className='w-screen h-screen fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm'
        onClick={() => handleCancel()}
      >
        <div className='bg-gray-600/50 p-2 rounded '
            onClick={(e) => e.stopPropagation()}
        >
            <p>Are you sure you want to delete this?</p>
            <button
            className='hoverBase btn mr-2 '
            onClick={() => handleCancel()}
            >
                Cancel
            </button>
            <button
            className='hoverBase btn'
            onClick={() => handleDelete()}
            >
                Confirm
            </button>
        </div>
      </div>
    </>
  )
}

export default Confirmation
