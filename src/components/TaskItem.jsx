import React, { useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'
import TaskDetails from './TaskDetails'

function TaskItem({task}) {
  const { deleteTask, selectId, setSelectId} = useTodoContext()
  const [isUpdate, setIsUpdate] = useState(false);

    const isCompleted = task.status === "completed"
    const [showDetails, setShowDetails] = useState(false);

  const handleUpdate = () => {
    setIsUpdate(!isUpdate)
    setSelectId(task.id)
  }

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo")
    if(isConfirmed) 
      deleteTask(task.id)
  }
  return (
    <>
      <div tabIndex={0} className='py-1 px-4 border border-gray-300 rounded mb-4 hover:border-gray-400 focus:border-blue-700 '
      >
        <div className='flex flex-col gap-4 mt-1 border border-gray-300 rounded-md p-2'>
            <div className='flex-1 flex gap-4'>
              <div className=''>
                <input type="radio" />
              </div>
              <div className=''>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div >
                  {task.category && <p>{task.category}</p>}
                  {task.status && <p>{task.status}</p>}
                  {task.dueDate && <p>{task.dueDate}</p>}
                </div>
              </div>
              <div className='ml-auto'>
                flag  
              </div>
            </div>
        </div>
        <div className='flex '>
          <div className='hoverBase btn border-gray-500 w-fit m-2'
          onClick={() => handleDelete()}
          >
            Delete
          </div>
          <div className='hoverBase btn border-gray-500 w-fit m-2'
          onClick={() => handleUpdate()}
          >
            Update
          </div>
        </div>
      </div>  

      <div>
        {isUpdate ? <TaskDetails isUpdate={isUpdate} setIsUpdate={setIsUpdate}/> : ""}
      </div>
    </>
  )
}

export default TaskItem
