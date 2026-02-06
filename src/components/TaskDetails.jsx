import React, { useEffect, useState } from 'react'
import { IoMdTime } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import useTodoContext from '../context/TodoContext';

function TaskDetails({setIsUpdate, isUpdate}) {
  const {selectId, setSelectId, tasks, deleteTask, updateTask} = useTodoContext();
  const [updatedData, setUpdatedData] = useState({})

  useEffect(() => {
    const task = tasks.find((eachTask) => eachTask.id === selectId);
    setUpdatedData(task)
  }, [selectId])
  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUpdatedData(prev => ({...prev, [name]: value}))
  }

  const handleUpdate = () => {
    updateTask(updatedData);
    setIsUpdate(!isUpdate)
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if(isConfirmed) {
      deleteTask(id);
      // alert("Todo deleted successfully");
    }
    return;
  }

  return (
    <>
      <div className='min-w-screen min-h-screen fixed top-0 left-0 backdrop-blur-sm flex justify-center items-center z-9999'>

          <div className='flex flex-col gap-4 bg-blue-900/25 min-h-full rounded-xl p-4 '>
            {/* 1st part */}
            <div className='flex-1 border-b border-gray-300 rounded px-4 py-2 flex justify-between'>
              <p>Task Details</p>
              <span className='border h-8 w-8 flex justify-center items-center rounded-[100%] bg-gray-300 cursor-pointer'
                onClick={() => setIsUpdate(!isUpdate)}
              >X</span>
            </div>

            {/* 2nd part */}
            <div className='flex-3 max-h-[70vh] overflow-y-auto border-b border-gray-300 '>
              <div className='flex flex-col gap-2 '>

                <div className='mx-2'>
                  <label 
                  className='heading4 ' 
                  htmlFor='title'>
                    Title: 
                  </label>
                  <input 
                  type="text" id='title' name='title'
                  value={updatedData.title}
                  className='inputBase px-2 py-1 text-sm'
                  onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className='mx-2'>
                  <label 
                  className='heading4'
                  htmlFor="description" id='description'>
                    Description
                  </label>
                  <textarea name="description" id="description" 
                  value={updatedData.description}
                  className='inputBase px-2 py-1 text-sm '
                  onChange={(e) => handleChange(e)}
                  rows={4}
                  ></textarea>
                </div>

                <div className='mx-2'>
                  <label 
                  className='heading4 '
                  htmlFor='priority'
                  >
                    Priority:
                  </label>
                  <p>
                    <select name="priority" id="priority" 
                    value={updatedData.priority}
                    className='inputBase text-sm '
                    onChange={(e) => handleChange(e)}
                    >
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </p>
                </div>

                <div className='mx-2'>
                  <label 
                  className='heading4 '
                  htmlFor='status'
                  >
                    Status:
                  </label>
                  <p>
                    <select name="status" id="status" 
                    value={updatedData.status}
                    className='inputBase text-sm '
                    onChange={(e) => handleChange(e)}
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">Inprogress</option>
                      <option value="complete">Complete</option>
                    </select>
                  </p>
                </div>

                <div className='mx-2'>
                  <label 
                  className='heading4'
                  htmlFor='category'
                  >
                    Category:
                    </label>
                  <p>
                    <select name="category" id="category" 
                    value={updatedData.category}
                    className='inputBase text-sm '
                    onChange={(e) => handleChange(e)}
                    >
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="shopping">Shopping</option>
                    </select>
                  </p>
                </div>

                <div className='mx-2'>
                  <label 
                  className='heading4 '
                  htmlFor='dueDate'
                  >
                    Due Date:
                    </label>
                  <p>
                    <input 
                      type="date" id='date' name='dueDate'
                      value={updatedData.dueDate}
                      onChange={(e) => handleChange(e)}
                      className='inputBase text-sm '
                  />
                  </p>

                  <p className='text-sm '>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
                <div>
                  <p>Created At</p>
                </div>
              </div>
            </div>

            {/* 3rd part  */}
            <div className='flex-1 flex items-center justify-between gap-4 px-2 self-end '>
              <button className='btn hoverBase flex items-center gap-2'
              onClick={() => setIsUpdate(!isUpdate)}
              >
                <span>
                  <MdDeleteForever />
                </span>
                <span>
                  Cancel
                </span>
              </button>
              
              <button className='btn hoverBase flex items-center gap-2'
              onClick={() => handleDelete(updatedData.id)}
              >
                <span>
                  <MdDeleteForever />
                </span>
                <span>Delete</span>
              </button>
              
              <button className='btn hoverBase flex items-center gap-2'
              onClick={() => handleUpdate()}
              >
                <span>
                  <RxUpdate />
                </span>
                <span>Update</span>
              </button>
            </div>
          </div>
        
      </div>
    </>
  )
}

export default TaskDetails
