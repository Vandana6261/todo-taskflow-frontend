
// main content here filter + todos + Add Task Button.

import React, { useState } from 'react'
import AddTaskDialogBox from './AddTaskDialogBox'
import TaskItem from './TaskItem';
import useTodoContext from '../context/TodoContext';
import SearchBar from './SearchBar';

// console.log("TaskList rendered")

function TaskList() {
    const [showDialogBox, setShowDialogBox] = useState(false);
    const {addTask, taskToBeShow} = useTodoContext();
    const [active, setActive] = useState("");

  return (
    <>
      <div className='relative h-full'>
        <div className='w-full border-b border-gray-400 p-2 '>
          <SearchBar />
        </div>

        <div className='  '>
          {taskToBeShow.length === 0 ?
            <div className='flex justify-center items-center mt-8'>
              <p className='text-xl '>No todos to display</p>
            </div>
            :
            <div className='max-w-screen max-h-[70vh] overflow-y-auto pt-2 '>
              {taskToBeShow.map((task) => {
                return (
                  <div key={task.id} tabIndex={0} className={` ${active === task.id ? "onClickEffect transitionEffect" : ""}`}
                  onClick={() => {setActive(task.id)}}
                  >
                    <TaskItem task={task} />
                  </div>
                )
              })}
            </div>
          }
        </div>


        <div className='absolute bottom-10 w-full'>
          <button
          onClick={() => setShowDialogBox(true)}
          className='btn hoverBase w-1/2 bg-amber-200 '
          >Add Task</button>
          <AddTaskDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox}/>
        </div>
      </div>
    </>
  )
}

export default TaskList
