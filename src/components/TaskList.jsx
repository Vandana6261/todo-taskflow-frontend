
// main content here filter + todos + Add Task Button.

import React, { useState } from 'react'
import AddTaskDialogBox from './AddTaskDialogBox'
import TaskItem from './TaskItem';
import useTodoContext from '../context/TodoContext';
import SearchBar from './SearchBar';
import InProgressTodo from './InProgressTodo';
import PendingTodo from './PendingTodo'
import CompledTodo from './CompledTodo';

// console.log("TaskList rendered")

function TaskList() {
  const [showDialogBox, setShowDialogBox] = useState(false);
  const { addTask, taskToBeShow, loading, isData } = useTodoContext();
  const [active, setActive] = useState("");
  // const columns = ["pending", "inProgress", "complete"];

  const pendingTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "pending" && !eachTask.isDeleted
  })
  const inProgressTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "inProgress" && !eachTask.isDeleted
  })
  const completedTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "complete" && !eachTask.isDeleted
  })

  return (
    <>
      <div className='relative h-full select-none'>
        <div className='flex justify-around w-full border-b border-gray-400 p-2 '>
          <SearchBar />
          <button
            onClick={() => setShowDialogBox(true)}
            className='btn hoverBase border-none w-auto py-2 font-semibold bg-[#3753a1cb] '
          >Add Task</button>
          <AddTaskDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox} />
        </div>

        <div className='  '>
          {loading && <div className='text-5xl w-full min-h-full text-black'>Loading....</div>}
          {!isData && <div className='text-3xl w-full min-h-full text-black'>Oops! Data is not available</div>}
          {!taskToBeShow ?
            <div className='flex justify-center items-center mt-8'>
              <p className='text-xl '>No todos to display</p>
            </div>

            :

            <div className='max-w-screen max-h-[78vh] pt-2 flex'>
              <div className='flex-1 m-1 bg-[#7591ad] overflow-y-auto scrollbar-hide relative'>
                <h2 className='text-center text-lg font-semibold sticky top-0 bg-[#7591ad]'>Pending Task</h2>
                <div className=' rounded '>
                  {
                    pendingTask.map(item => <TaskItem task={item} />)
                  }
                </div>
              </div>
              <div className='flex-1 m-1 bg-[#7591ad] overflow-y-auto  scrollbar-hide relative'>
                <h2 className='text-center text-lg font-semibold sticky top-0 bg-[#7591ad]'>InProgress Task</h2>
                <div className=' rounded '>
                  {
                    inProgressTask.map(item => <TaskItem task={item} />)
                  }
                </div>
              </div>
              <div className='flex-1 m-1 bg-[#7591ad] overflow-y-auto  scrollbar-hide  relative'>
                <h2 className='text-center text-lg font-semibold sticky top-0 bg-[#7591ad]'>Complete Task</h2>
                <div className='rounded '>
                  {
                    completedTask.map(item => <TaskItem task={item} />)
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default TaskList
