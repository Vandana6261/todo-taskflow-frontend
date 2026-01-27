
// main content here filter + todos + Add Task Button.

import React, { useState } from 'react'
import AddTaskDialogBox from './AddTaskDialogBox'
import TaskItem from './TaskItem';
import { useTodo } from '../hooks/useTodo';
import useTodoContext from '../context/TodoContext';

function TaskList() {
    const [showDialogBox, setShowDialogBox] = useState(false);
    const {tasks, addTask} = useTodoContext();
    // console.log(tasks)

  return (
    <>
      <div className='relative h-full'>
        {tasks.length === 0 ?
          <div className='flex justify-center items-center mt-8'>
            <p className='text-xl '>No todos to display</p>
          </div>
          :
          <div className='max-w-screen max-h-[70vh] overflow-y-auto'>
            {tasks.map((task) => {
              return (
                <div className=''>
                  <TaskItem task={task} />
                </div>
              )
            })}
          </div>
        }
        <div className='absolute bottom-10 w-full'>
          <button
          onClick={() => setShowDialogBox(true)}
          className='btn hoverBase w-1/2 bg-amber-200 '
          >Add Task</button>
          <AddTaskDialogBox addTask={addTask} showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox}/>
        </div>
      </div>
    </>
  )
}

export default TaskList
