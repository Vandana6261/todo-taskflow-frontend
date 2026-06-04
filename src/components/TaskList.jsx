
// main content here filter + todos + Add Task Button.

import React, { useEffect, useState } from 'react'
import AddTaskDialogBox from './AddTaskDialogBox'
import TaskItem from './TaskItem';
import useTodoContext from '../context/TodoContext';
import SearchBar from './SearchBar';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';


// console.log("TaskList rendered")

function TaskList() {
  const [showDialogBox, setShowDialogBox] = useState(false);
  const { addTask, taskToBeShow, updateTask, isData, loadTodo , logout} = useTodoContext();
  const [active, setActive] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const pendingTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "pending" && !eachTask.isDeleted
  })
  const inProgressTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "inProgress" && !eachTask.isDeleted
  })
  const completedTask = taskToBeShow.filter(eachTask => {
    return eachTask.status === "complete" && !eachTask.isDeleted
  })

  useEffect(() => {
    async function loadData() {
      await loadTodo();
    }
  }, [])

  const handleDragStart = (e, item) => {
    console.log("onDragStart")
    console.log(item)
    e.dataTransfer.setData("todoItem", JSON.stringify(item))
  }

  const handleDragOver = (e) => {
    console.log("onDragOver")
    e.preventDefault();
  }

  const handleDrop = (e, status) => {
    e.preventDefault();
    console.log("onDrop")
    console.log(status)
    const data = JSON.parse(e.dataTransfer.getData("todoItem"));
    console.log(data)
    if (data.status == status) {
      return;
    }
    if (status == "complete") {
      data.isCompleted = true;
    }
    else {
      data.isCompleted = false;
    }
    data.status = status;
    updateTask(data._id, data);
  }

  const handleLogout = async () => {
    await logout();
    navigate("/")
  }

  return (
    <>
      <div className='relative h-full select-none bg-[#fcfaf8b6]'>
        <div className='flex justify-center gap-4 border-gray-400 p-2'>
          <SearchBar setisLoading={setisLoading} />
          <button
            onClick={() => setShowDialogBox(true)}
            className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
          >Add Task</button>
          <button 
            onClick={() => handleLogout()}
            className='btn hoverBase border-none w-auto py-2 text-white font-semibold bg-[#0019f7a8] rounded-full hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'
          >
            Log Out
          </button>
          <AddTaskDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox} />
        </div>

        <div className=''>
          {taskToBeShow.length === 0 ?
            (isLoading ? 
              (<Loader />)
              :
              (<div className='flex justify-center items-center mt-8'>
                <p className='text-xl '>No todos to display</p>
              </div>)
            )
            :
            <div className='max-w-screen md:max-h-[78vh] pt-2 flex flex-col md:flex-row bg-[#f3f1f1] px-2 overflow-y-auto md:overflow-hidden'>

              <div className='flex-1 m-1 border border-gray-300 bg-[#d2d2ec83] min-h-[40vh] md:min-h-[76vh] rounded-2xl overflow-y-auto scrollbar-hide relative p-2'
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "pending")}
              >
                <h2 className='text-center text-lg  font-semibold text-[#2a344b] sticky top-0 bg-[#ffffff9d] rounded mb-6'>Pending Task</h2>
                <div className='rounded flex flex-col gap-2'>
                  {
                    pendingTask.map(item => (
                      <div
                        key={item._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={(e) => console.log("onDragEnd")}
                        className='cursor-grab active:cursor-grabbing'
                      >
                        <TaskItem task={item}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className='flex-1 m-1 border border-gray-300 bg-[#d2d2ec83] min-h-[40vh] md:min-h-[76vh] rounded-2xl overflow-y-auto scrollbar-hide relative p-2'
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "inProgress")}
              >
                <h2 className='text-center text-lg font-semibold text-[#2a344b] sticky top-0 bg-[#ffffff] rounded mb-6'>InProgress Task</h2>
                <div className='rounded flex flex-col gap-2'
                >
                  {
                    inProgressTask.map(item => (
                      <div
                        key={item._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={(e) => console.log("onDragEnd")}
                        className='cursor-grab active:cursor-grabbing'
                      >
                        <TaskItem task={item} />
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className='flex-1 m-1 border border-gray-300 bg-[#d2d2ec83] min-h-[40vh] md:min-h-[76vh] rounded-2xl overflow-y-auto scrollbar-hide relative p-2'
                onDragEnter={e => console.log('onDragEnter')}
                onDragLeave={e => console.log('onDragLeave')}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "complete")}
              >
                <h2 className='text-center text-lg font-semibold text-[#2a344b] sticky top-0 bg-[#ffffff] rounded mb-6'>Completed Task</h2>
                <div className='rounded flex flex-col gap-2'>
                  {
                    completedTask.map(item => (
                      <div
                        key={item._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragEnd={(e) => console.log("onDragEnd")}
                        className='cursor-grab active:cursor-grabbing'
                      >
                        <TaskItem task={item} />
                      </div>
                    ))
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
