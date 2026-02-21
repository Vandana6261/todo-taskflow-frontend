import React, { useEffect, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'
import TaskDetails from './TaskDetails'
import { createPortal } from 'react-dom'
import Confirmation from './Confirmation'

// console.log("TaskItem rendered")

function TaskItem({task}) {
  const {tasks, updateTask, setSelectId, selectId, categories} = useTodoContext()
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [confirmDelete, setConfirmDelete] = useState(false);
   const [updatedData, setUpdatedData] = useState({})

    // const isCompleted = task.status === "completed"
  // console.log(task)
  const handleUpdate = () => {
    setSelectId(task._id)
    setIsUpdate(!isUpdate)
    const taskToBeUpdated = tasks.find((eachTask) => eachTask._id === task._id);
    setUpdatedData(taskToBeUpdated)
  }

  const handleDelete = () => {
    setConfirmDelete(!confirmDelete)
  }
  
  useEffect(() =>{
    // updateTask(selectId, {...task, isCompleted: true})
  }, [isCompleted])

  return (
    <>
      <div tabIndex={0} className={`py-1 px-4 border-b border-t border-gray-300 rounded mb-4 hover:border-gray-400 `}
      onClick={() => setSelectId(task._id)}
      >
        {/* task title, description, etc. */}
        <div className={`flex flex-col mt-1  rounded-md p-2 ${isCompleted ? "line-through text-gray-400" : ""}`}>
            <div className='flex-1 flex gap-4'>
              <div className=''>
                <input 
                className='cursor-pointer'
                type="checkbox"  id='checkbox' name='checkbox' checked={isCompleted}
                onChange={(e) => {
                  updateTask(selectId, {...task, isCompleted:e.target.checked})
                  setIsCompleted(e.target.checked)
                }}
                />
              </div>
              <div className='flex flex-col '>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div className='flex gap-4 items-center'>
                  {task.category && <small className='bg-blue-400/60 w-fit rounded px-4 '>{task.category}</small>}
                  {task.status && <small className='bg-purple-500/40 w-fit rounded px-4 '>{task.status}</small>}
                  {task.dueDate && <small>{task.dueDate} dueDate</small>}
                </div>
              </div>
              {/* <div className='ml-auto'>
                flag  
              </div> */}
            </div>

        </div>

        {/* button delete and update */}
        <div className='flex '>
          <button className='hoverBase btn border-gray-600 w-fit m-2 bg-delete-color text-white'
          onClick={() => handleDelete()}
          >
            Delete
          </button>
          <button className={`hoverBase btn border-gray-600 w-fit m-2 bg-update-color text-white ${isCompleted ? "line-through text-gray-400 border-gra-300 " : ""}`}
          onClick={() => handleUpdate()}
          disabled={isCompleted}
          >
            Update
          </button>
        </div>
      </div>  
      
      {/* TaskDetails (update) */}
      <div className=''>
        {createPortal (
          isUpdate ? <TaskDetails isUpdate={isUpdate} setIsUpdate={setIsUpdate} updatedData={updatedData} setUpdatedData={setUpdatedData} /> : "", document.body
        )}
      </div>

      {/* confirmation (delete) */}
      <div>
        {createPortal (
          confirmDelete ? <Confirmation task={task} taskId={task._id} setConfirmDelete={setConfirmDelete}/> : "", document.body
        )}
      </div>
    </>
  )
}

export default TaskItem
