
// main content here filter + todos + Add Task Button.

import React, { useState } from 'react'
import AddTaskDialogBox from './AddTaskDialogBox'
import TaskItem from './TaskItem';
import { useTodo } from '../hooks/useTodo';

function TaskList() {
    const [showDialogBox, setShowDialogBox] = useState(false);
    const {tasks, addTask} = useTodo()
    console.log(tasks)

  return (
    <>

      {!tasks ? 
        <div>
          <p>No todos to display</p>
        </div>
        :
        <div>
          {tasks.map((task) => {
            return <TaskItem task={task} />
          })}
        </div>
      }
      <div className='max-w-screen min-h-screen bg-transparent'>
        <button 
        onClick={() => setShowDialogBox(true)}
        className='btn hoverBase'
        >Add Task</button>

        <AddTaskDialogBox addTask={addTask} showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox}/>
      </div>
    </>
  )
}

export default TaskList
