import React from 'react'
import { useTodo } from '../hooks/useTodo'

function TaskItem({task}) {
    // const {tasks} = useTodo();
    console.log(task)

    const isCompleted = task.status === "completed"
  return (
    <>
      <div className='w-screen h-auto bg-amber-500 '>
        <div className='flex flex-col'>
            <div className='flex-1'>
              <div>
                <input type="radio" />
              </div>
              <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div>
                  {task.category && <p>{task.category}</p>}
                  {/* {task.dueDate && <p>{task.dueDate}</p>} */}
                  {/* {console.log(typeof task.dueDate)} */}
                  {task.status && <p>{task.status}</p>}
                </div>
              </div>
              <div></div>
            </div>
        </div>
      </div>
    </>
  )
}

export default TaskItem
