import React, { useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'

// console.log("SearchBar rendered")

function AddTaskDialogBox({showDialogBox, setShowDialogBox}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("medium")
    const [status, setStatus] = useState("pending")
    const [category, setCategory] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [dateError, setDateError] = useState("")
    
    const { addTask } = useTodoContext()
    
    const today = new Date().toISOString().split("T")[0];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || ! description || !priority || !status || !category || !dueDate ) {
            alert("Please fill all of this")
            return;
        }
        let task = {
            title,
            description,
            priority,
            status,
            category,
            dueDate,
        }
        // console.log(task)
        addTask(task)

        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("pending");
        setCategory("");
        setDueDate("")

        setShowDialogBox(false)
    }

    const handleCancel = (e) => {
        setShowDialogBox(false)
        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("pending");
        setCategory("");
        setDueDate("")
    }

  return (
    <>
      <div className={`min-w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm ${showDialogBox ? "flex" : "hidden"} text-left`}
      onClick={(e) => { setShowDialogBox(false) }}
      >
          <div className='modal-content modal bg-modal-color p-4 rounded } min-h-full`'
            onClick={(e) => {
                e.stopPropagation()
                // console.log("child called")
            }}
          >
              <h2 className='text-2xl text-center'>Create Task</h2>
              <form onSubmit={(e) => handleSubmit(e)}
               className='flex flex-col gap-2 max-h-[70vh] overflow-y-auto px-4 mt-2' 
               >
                <div className='flex flex-col gap-1'>
                    <label htmlFor="title" className='text-md font-semibold'>Title:</label>
                    <input 
                        type="text" 
                        id='title' 
                        name='title' 
                        placeholder='What needs to be done?'
                        value={title}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^A-Za-z ]/g, "");
                            setTitle(value)
                        }}
                        className='inputBase px-2 py-1'
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="description" className='text-md font-semibold'>Description:</label>
                    <input 
                        type="text" 
                        name="description" 
                        id="description" 
                        placeholder='Add More Details.....'
                        maxLength={300}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='inputBase px-2 py-1 h-12 overflow-y-auto'
                    />
                </div>


                <div className="dropdownSection grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="priority" className='text-md font-semibold'>Priority:</label>
                        <select 
                            name="priority" id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className='inputBase'
                        >
                            <option value="medium" >Medium</option>
                            <option value="low" >Low</option>
                            <option value="high" >High</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="status" className='text-md font-semibold'>Status:</label>
                        <select 
                            name="status" id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        className='inputBase'
                        >
                            <option value="peding" >Pending</option>
                            <option value="inProgress" >Inprogress</option>
                            <option value="complete" >Complete</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="category" className='text-md font-semibold'>Category:</label>
                        {/* new try */}
                        <input 
                            type="text" 
                            name="category" 
                            id="category" 
                            placeholder='work/presonal/shopping'
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='inputBase px-2 py-1'
                        />
                        
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="date" className='text-md font-semibold'>Due Date:</label>
                        <input 
                            type="date" id='date' name='date'
                            value={dueDate}
                            min={today}
                            onChange={(e) => {
                                let date = e.target.value;
                                if(date < today) {
                                    setDateError("Please select a valid date")
                                }
                                else {
                                    setDateError("")
                                    setDueDate(e.target.value)
                                }
                                // console.log(e.target.value).toISOString()
                            }}
                        className='inputBase'
                        />

                        {dateError && <p className='text-red-500'>{dateError}</p>}
                    </div>
                </div>

                <div className='flex gap-3 mt-2'>
                    <button 
                        type="button"
                        onClick={(e) => handleCancel(e)}
                        className='btn hoverBase bg-delete-color text-white'        
                    >Cancel</button>
                    <button 
                        type='submit'
                        className='btn hoverBase bg-update-color text-white'
                        onClick={(e) => handleSubmit(e)}
                    >Create Task</button>
                </div>
              </form>

          </div>
      </div>
    </>
  )
}

export default AddTaskDialogBox
