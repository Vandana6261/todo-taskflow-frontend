import React, { useEffect, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'
import TaskDetails from './TaskDetails'

function TaskItem({task}) {
  const { deleteTask, updateTask, setSelectId} = useTodoContext()
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    // const isCompleted = task.status === "completed"

  const handleUpdate = () => {
    setIsUpdate(!isUpdate)
    setSelectId(task.id)
  }

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo")
    if(isConfirmed) 
      deleteTask(task.id)
  }
  
  useEffect(() =>{

  }, [isCompleted])
  return (
    <>
      <div tabIndex={0} className={`py-1 px-4 border border-gray-300 rounded mb-4 hover:border-gray-400`}
      onClick={() => setSelectId(task.id)}
      >
        <div className={`flex flex-col gap-4 mt-1 border border-gray-300 rounded-md p-2 ${isCompleted ? "line-through text-gray-400" : ""}`}>
            <div className='flex-1 flex gap-4'>
              <div className=''>
                <input 
                className='cursor-progress'
                type="checkbox"  id='checkbox' name='checkbox' checked={isCompleted}
                onChange={(e) => {
                  updateTask({...task, isCompleted:e.target.checked})
                  setIsCompleted(e.target.checked)
                }}
                />
              </div>
              <div>
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
          <button className='hoverBase btn border-gray-600 w-fit m-2'
          onClick={() => handleDelete()}
          >
            Delete
          </button>
          <button className={`hoverBase btn border-gray-600 w-fit m-2 ${isCompleted ? "line-through text-gray-400 border-gra-300 " : ""}`}
          onClick={() => handleUpdate()}
          disabled={isCompleted}
          >
            Update
          </button>
        </div>
      </div>  

      <div className=''>
        {isUpdate ? <TaskDetails isUpdate={isUpdate} setIsUpdate={setIsUpdate}/> : ""}
      </div>
    </>
  )
}

export default TaskItem
