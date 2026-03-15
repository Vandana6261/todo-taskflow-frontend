
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
    return eachTask.status === "inprogress" && !eachTask.isDeleted
  })
  const completedTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "complete" && !eachTask.isDeleted
  })

  return (
    <>
      <div className='relative h-full select-none bg-[#F8FAFC]'>
        <div className='flex justify-center gap-4 border-gray-400 p-2'>
          <SearchBar />
          <button
            onClick={() => setShowDialogBox(true)}
            className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
          >Add Task</button>
          <AddTaskDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox} />
        </div>

        <div className='  '>
          {/* {loading && <div className='text-5xl w-full min-h-full text-black'>Loading....</div>} */}
          {/* {!isData && <div className='text-3xl w-full min-h-full text-black'>Oops! Data is not available</div>} */}
          {!taskToBeShow ?
            <div className='flex justify-center items-center mt-8'>
              <p className='text-xl '>No todos to display</p>
            </div>

            :

            <div className='max-w-screen max-h-[78vh] pt-2 flex bg-[#f3f1f1] px-2'>
              <div className='flex-1 m-1 border border-gray-300 bg-[#ceceec48] min-h-[76vh] rounded-2xl overflow-y-auto scrollbar-hide relative p-2'>
                <h2 className='text-center text-lg  font-semibold text-[#2a344b] sticky top-0 bg-[#ffffff9d] rounded mb-6'>Pending Task</h2>
                <div className='rounded flex flex-col gap-2'>
                  {
                    pendingTask.map(item => <TaskItem task={item} />)
                  }
                </div>
              </div>
              <div className='flex-1 m-1 border border-gray-300 bg-[#ceceec48] min-h-[76vh] rounded-2xl overflow-y-auto scrollbar-hide relative p-2'>
                <h2 className='text-center text-lg font-semibold text-[#2a344b] sticky top-0 bg-[#ffffff] rounded mb-6'>InProgress Task</h2>
                <div className='rounded flex flex-col gap-2'>
                  {
                    inProgressTask.map(item => <TaskItem task={item} />)
                  }
                </div>
              </div>
              <div className='flex-1 m-1 border border-gray-300 bg-[#ceceec48] min-h-[76vh] rounded-2xl overflow-y-auto scrollbar-hide relative p-2'>
                <h2 className='text-center text-lg font-semibold text-[#2a344b] sticky top-0 bg-[#ffffff] rounded mb-6'>Complete Task</h2>
                <div className='rounded flex flex-col gap-2'>
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
