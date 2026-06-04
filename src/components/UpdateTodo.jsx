import React, { useEffect, useState } from 'react'
import { IoMdTime } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import useTodoContext from '../context/TodoContext';
import { MdCancel } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

// console.log("UpdateTodo rendered")

function UpdateTodo({ setIsUpdate, isUpdate, updatedData, setUpdatedData }) {
  const { selectId, updateTask, categories } = useTodoContext();
  const [error, setError] = useState({})

  const today = new Date().toISOString().split("T")[0];
  const pattern = /^[A-Za-z ]+$/g;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let newError = {};
    if (updatedData.title == "") newError.title = "Title is required"
    if (!pattern.test(updatedData.title)) {
      newError.title = "Title is not valid, please use character only"
    }
    if (!updatedData.description.trim()) {
      newError.description = "Description is required"
    }
    if (!updatedData.category)
      newError.category = "Please choose one category";
    if (updatedData.dueDate < today) {
      newError.dueDate = "Please choose a valid date";
    }

    if (Object.keys(newError).length !== 0) {
      setError(newError);
      return;
    }

    updateTask(selectId, updatedData);
    setIsUpdate(!isUpdate)

    setUpdatedData({})
  }

  const handleCancel = () => {
    setIsUpdate(!isUpdate)
  }

  useEffect(() => {
  }, []);
  
  return (
    <>
      <div
        className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center'
        onClick={() => setIsUpdate(!isUpdate)}
      >

        <div className='flex flex-col gap-1 bg-[#ffffff] w-[90%] sm:w-[70vw] md:w-[40vw] rounded-xl p-4'
          onClick={(e) => e.stopPropagation()}
        >
          {/* 1st part */}
          <div className='flex-1 border-b border-gray-300 rounded px-4 py-2 flex justify-between'>
            <h2 className='text-2xl text-center'>Task Details</h2>
            <span 
              className='p-1 h-6 w-6 text-2xl rounded-full bg-gray-400/30 flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gray-400/50'
              onClick={(e) => handleCancel(e)}
            >
              <RxCross1 />
            </span>
          </div>
          
          <form
            onSubmit={(e) => handleUpdate(e)}
            className="flex flex-col gap-2 max-h-[70vh] relative"
          >
            {/* 2nd part */}
            <div className='overflow-y-auto'>
                <div className='flex flex-col gap-1'>
                  <label
                    className='text-md font-semibold '
                    htmlFor='title'>
                    Title:
                  </label>
                  <input
                    type="text" id='title' name='title'
                    value={updatedData?.title}
                    className='inputBase px-2 py-1'
                    onChange={(e) => handleChange(e)}
                  />
                  {error && error.title && (
                    <p className="text-red-500">{error.title}</p>
                  )}
                </div>
                
                <div className='flex flex-col gap-1'>
                  <label
                    className='text-md font-semibold'
                    htmlFor="description" id='description'>
                    Description
                  </label>
                  <input
                    type="text"
                    name='description'
                    maxLength={300}
                    value={updatedData.description}
                    className='inputBase px-2 py-1 h-12 overflow-y-auto'
                    onChange={(e) => handleChange(e)}
                  />
                  {error && error.description && (
                    <p className="text-red-500">{error.description}</p>
                  )}
                </div>

                <div className='flex flex-col gap-1'>
                  <label
                    className='text-md font-semibold '
                    htmlFor='priority'
                  >
                    Priority:
                  </label>
                  <p>
                    <select name="priority" id="priority"
                      value={updatedData?.priority}
                      className='inputBase text-gray-600'
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                  </p>
                </div>

                <div className='flex flex-col gap-1'>
                  <label
                    className='text-md font-semibold '
                    htmlFor='status'
                  >
                    Status:
                  </label>
                  <p>
                    <select name="status" id="status"
                      value={updatedData?.status}
                      className='inputBase px-2 text-gray-600'
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="pending">Pending</option>
                      <option value="inProgress">Inprogress</option>
                      <option value="complete">Complete</option>
                    </select>
                  </p>
                </div>

                <div className='flex flex-col gap-1'>
                  <label
                    className='text-md font-semibold'
                    htmlFor='category'
                  >
                    Category:
                  </label>
                  <p>
                    <select name="category" id="category"
                      value={updatedData?.category}
                      className='inputBase px-2 text-gray-600'
                      onChange={(e) => handleChange(e)}
                    >
                      {categories.map((item, index) => {
                        return (
                          <option key={item} value={item}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </p>
                </div>

                <div className='flex flex-col gap-1'>
                  <label
                    className='text-md font-semibold '
                    htmlFor='dueDate'
                  >
                    Due Date:
                  </label>
                  <p>
                    <input
                      type="date" id='date' name='dueDate'
                      value={updatedData?.dueDate}
                      onChange={(e) => handleChange(e)}
                      className='inputBase px-2 text-gray-600'
                    />
                  </p>
                  {error && error.dueDate && (
                    <p className="text-red-500">{error.dueDate}</p>
                  )}
                </div>
            </div>

            {/* 3rd part  */}
            <div className='flex gap-3 self-end mt-2 relative bottom-0'>
              <button className='hoverBase btn mx-2  font-semibold bg-red-300/20 text-red-600 '
                onClick={() => setIsUpdate(!isUpdate)}
              >
                <span>
                  Cancel
                </span>
              </button>
              <button className='hoverBase btn mx-2 font-semibold bg-green-500/20 text-[#229c09] hoverBase flex items-center gap-2'
              >
                <span>
                  <RxUpdate />
                </span>
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </>
  )
}

export default UpdateTodo
