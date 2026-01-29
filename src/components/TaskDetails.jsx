import React, { useEffect, useState } from 'react'
import { IoMdTime } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import useTodoContext from '../context/TodoContext';

function TaskDetails() {
  const {selectId, setSelectId, tasks, deleteTask, updateTask} = useTodoContext();

  
  return (
    <>
      <div>
        {
          selectId === null ? 
          <div>
            <span>
              <IoMdTime /> 
            </span>
            <h3>No Task Selected</h3>
            <p>Click on a task to view and edit its details</p>
          </div>
          : 
          // <div>Hello</div>
          <div className='flex flex-col gap-4 bg-amber-100 min-h-full'>
            {/* 1st part */}
            <div className='flex-1 border-b border-gray-300 rounded px-4 py-2 flex justify-between'>
              <p>Task Details</p>
              <span className='border h-8 w-8 flex justify-center items-center rounded-[100%] bg-gray-300 '>X</span>
            </div>

            {/* 2nd part */}
            <div className='flex-3 max-h-[70vh] overflow-y-auto border-b border-gray-300 '>
              <div className='flex flex-col gap-2 '>
                <div className='mx-2'>
                  <h4 className='heading4 '>Title: </h4>
                  <input type="text" 
                  // value={}
                  className='inputBase px-2 py-1 text-sm'
                  onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className='mx-2'>
                  <h4 className='heading4 '>Description:</h4>
                  <textarea name="description" id="description" 
                  // value={}
                  className='inputBase px-2 py-1 text-sm '
                  onChange={(e) => handleChange(e)}
                  rows={4}
                  ></textarea>
                </div>
                <div className='mx-2'>
                  <h4 className='heading4 '>Priority:</h4>
                  <p>
                    <select name="priority" id="priority" 
                    // 
                    // value={}
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
                  <h4 className='heading4 '>Status:</h4>
                  <p>
                    <select name="status" id="status" 
                    // value={}
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
                  <h4 className='heading4'>Category:</h4>
                  <p>
                    <select name="category" id="category" 
                    // value={}
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
                  <h4 className='heading4 '>Due Date:</h4>
                  <p>
                    <input 
                      type="date" id='date' name='date'
                      // value={}
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
              // onClick={() => handleDelete(task[0].id)}
              >
                <span>
                  <MdDeleteForever />
                </span>
                <span>Delete</span>
              </button>
              <button className='btn hoverBase flex items-center gap-2'
              // onClick={() => hanldeUpdate(task[0].id)}
              >
                <span>
                  <RxUpdate />
                </span>
                <span>Show Changes</span>
              </button>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default TaskDetails
