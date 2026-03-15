import React, { useEffect, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'
import TaskDetails from './TaskDetails'
import { createPortal } from 'react-dom'
import Confirmation from './Confirmation'

// console.log("TaskItem rendered")

function TaskItem({task}) {
  const {tasks, updateTask, setSelectId} = useTodoContext()
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updatedData, setUpdatedData] = useState({})

  const styleMap = {
    complete: "bg-green-400/20 text-green-400",
    inprogress: "bg-blue-700/30 text-blue-700",
    pending: "bg-red-500/20 text-red-500"
  }

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
    // console.log(task)
  }, [isCompleted])

  return (
    <>  
      <div>
        <div tabIndex={0} className={`px-4 border-b bg-[#ffffff] min-h-30 pb-2 text-sm m-1 border border-gray-300 rounded-xl shadow-[0px_5px_10px_2px_rgba(0,0,0,0.25)]  hover:shadow-[0px_5px_10px_rgba(0,0,0,0.25)] hover:border-gray-400 `}
        onClick={() => setSelectId(task._id)}
        >
          {/* task title, description, etc. */}
          <div className={`flex flex-col rounded-md py-2 ${isCompleted ? "line-through text-gray-400" : ""}`}>
              <div className='flex gap-2'>
                <div className=''>
                  <input
                  className='cursor-pointer'
                  type="checkbox"  id='checkbox' name='checkbox' checked={isCompleted}
                  onChange={(e) => {
                    console.log(e.target.checked)
                    updateTask(task._id, {...task, isCompleted:e.target.checked})
                    setIsCompleted(e.target.checked)
                  }}
                  />
                </div>
                <div className='flex flex-col'>
                  <h2>{task.title}</h2>
                  <p className='text-gray-500'>{task.description}</p>
                  <div className='mt-2 flex gap-3 items-center'>
                    {task.category && <p className='bg-gray-300/30 text-gray-700 w-fit rounded px-4 '>{task.category.name}</p>}
                    {task.status && <p className={`w-fit rounded px-4 font-semibold ${styleMap[task.status]}`}>{task.status}</p>}
                  </div>
                    {/* {task.dueDate && <p className='bg-purple-200 px-2 rounded '>dueDate: <br /> {task.dueDate}</p>} */}
                </div>
              </div>
          </div>

          {/* button delete and update */}
          <div className='flex justify-between'>
            <div>{task.dueDate && <small className=' px-2 rounded  text-gray-500'>Due: {task.dueDate}</small>}</div>
            <div>
              <button className='hoverBase btn mx-2 font-semibold bg-gray-300/20  text-gray-600 hover:text-red-600'
              onClick={() => handleDelete()}
              >
                Delete
              </button>
              <button className={`hoverBase btn mx-2 font-semibold bg-blue-600/10 text-[#4F39F6] ${isCompleted ? "line-through  " : ""}`}
              onClick={() => handleUpdate()}
              disabled={isCompleted}
              >
                Update
              </button>
            </div>
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
      </div>
    </>
  )
}

export default TaskItem
