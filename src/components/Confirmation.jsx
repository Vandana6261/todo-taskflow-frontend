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
        <div className='bg-modal-color p-2 rounded min-h-40 flex flex-col justify-center items-center gap-2'
            onClick={(e) => e.stopPropagation()}
        >
            <p>Are you sure you want to delete this?</p>
            <div>
              <button
              className='hoverBase btn mr-2 bg-delete-color text-white'
              onClick={() => handleCancel()}
              >
                  Cancel
              </button>
              <button
              className='hoverBase btn bg-update-color text-white'
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
