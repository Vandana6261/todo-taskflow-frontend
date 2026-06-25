import React, { useEffect, useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'
import UpdateTodo from './UpdateTodo'
import { createPortal } from 'react-dom'
import Confirmation from './Confirmation'
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

// console.log("TaskItem rendered")

function TaskItem({ task }) {
  const { tasks, updateTask, setSelectId, deleteTask } = useTodoContext()
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [updatedData, setUpdatedData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const styleMap = {
    complete: "text-[#10B981]",
    inProgress: " text-[#3B82F6]",
    pending: " text-[#F59E0B]"
  }

  const handleUpdate = () => {
    setSelectId(task._id)
    setIsUpdate(!isUpdate)
    const taskToBeUpdated = tasks.find((eachTask) => eachTask._id === task._id);
    setUpdatedData(taskToBeUpdated)
  }

  const handleDelete = async () => {
    const response = await deleteTask(task._id, { ...task, isDeleted: true });
  }

  useEffect(() => {
  }, [isCompleted])

  return (
    <>
      <div tabIndex={0} className={`px-4 border-b bg-todoCard min-h-30 pb-2 text-sm m-1  rounded-xl shadow-[0px_5px_10px_2px_rgba(0,0,0,0.25)]  hover:shadow-[0px_5px_10px_rgba(0,0,0,0.25)] hover:border-gray-400 `}
        onClick={() => setSelectId(task._id)}
      >
        {/* task title, description, etc. */}
        <div className={`flex flex-col rounded-md py-2 ${isCompleted ? "line-through text-gray" : ""}`}>
          <div>
            <div>
              <input
                className='cursor-pointer' 
                type="checkbox" id='checkbox' name='checkbox' checked={isCompleted}
                onChange={(e) => {
                  const status = task.status !== "complete" ? "complete" : "inProgress";
                  updateTask(task._id, { ...task, isCompleted: e.target.checked, status })
                  setIsCompleted(e.target.checked)
                }}
              />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <div className='flex justify-between items-center'>
                <h2 className='text-base font-semibold text-muted'>{task.title}</h2>
                <div className='flex-1'>
                  <button className='hoverBase px-1 py-1 rounded-xl  mx-2 font-semibold text-xl text-danger/50 bg-danger/10'
                    onClick={() => setIsOpen(!isOpen)
                    }
                  >
                    <MdDeleteForever />
                  </button>
                  <button className={`hoverBase px-1 py-1 mx-2 font-semibold text-xl rounded-xl text-success/50 bg-success/10 ${isCompleted ? "line-through  " : ""}`}
                    onClick={() => handleUpdate()}
                    disabled={isCompleted}
                  >
                    <GrUpdate />
                  </button>
                </div>
              </div>
              <p className='text-muted bg-muted/10'>{task.description}</p>
              <div className='mt-2 flex items-center justify-between '>
                {task.category && <p className='bg-gray-400/30 text- w-fit rounded'>{task.category.name}</p>}
                {task.status && <p className={`w-fit rounded px-4 font-semibold ${styleMap[task.status]}`}>{task.status}</p>}
              </div>
            </div>


          </div>
        </div>

        {/* button delete and update */}
        <div className='flex justify-between'>
          <div>{task.dueDate && <small className=' px-2 rounded  text-gray-400'>Due: {task.dueDate}</small>}</div>
        </div>
      </div>

      {/* UpdateTodo (update) */}
      {createPortal(
        isUpdate ? <UpdateTodo isUpdate={isUpdate} setIsUpdate={setIsUpdate} updatedData={updatedData} setUpdatedData={setUpdatedData} /> : "",
        document.body
      )}
      {/* confirmation (delete) */}
      <div>
        {createPortal(
          isOpen ? <Confirmation setIsOpen={setIsOpen} handleConfirmation={handleDelete} text={"Delet this todo"}  /> : "", document.body
        )}
      </div>
    </>
  )
}

export default TaskItem
