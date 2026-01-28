import React, { useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'

function TaskItem({task}) {
  const { deleteTask, selectId, setSelectId} = useTodoContext()

    const isCompleted = task.status === "completed"
    const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div tabIndex={0} className='py-1 px-4 border border-gray-300 rounded mb-4 hover:border-gray-400 focus:border-blue-700 '
      onClick={() => setSelectId(task.id)}
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
                  {/* {task.dueDate && <p>{task.dueDate}</p>} */}
                  {/* {console.log(typeof task.dueDate)} */}
                  {task.status && <p>{task.status}</p>}
                </div>
              </div>
              <div className='ml-auto'>
                flag
              </div>
            </div>
        </div>
        {/* <div className='hoverBase btn w-fit m-2' 
        onClick={() => deleteTask(task.id)}
        >
          Delete
        </div> */}
      </div>
    </>
  )
}

export default TaskItem
