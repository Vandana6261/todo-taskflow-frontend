import React, { useState } from 'react'
import { useTodo } from '../hooks/useTodo'

function AddTaskDialogBox({showDialogBox, setShowDialogBox}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("medium")
    const [status, setStatus] = useState("pending")
    const [category, setCategory] = useState("abc")
    const [dueDate, setDueDate] = useState("")

    const {addTask} = useTodo();

    const inputBase = {
    blue: "bg-blue-600 hover:bg-blue-500 text-white",
    red: "bg-red-500 hover:bg-red-400 text-white",
    yellow: "bg-yellow-300 hover:bg-yellow-400 text-black",
  };



    const handleSubmit = (e) => {
        if(!title || ! description || !priority || !status || !category || !dueDate) {
            // alert("Please fill all of this")
            // return;
        }
        console.log(typeof dueDate)
        e.preventDefault();
        let task = {
            title,
            description,
            priority,
            status,
            category,
            dueDate,
        }
        addTask(task)
        // console.log(task)
        // console.log("Call the add Task")

        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("pending");
        setCategory("abc");
        setDueDate("")
    }
  return (
    <>
      <div className={`min-w-screen min-h-screen fixed top-0 flex justify-center items-center backdrop-blur-lg z-99 ${showDialogBox ? "flex" : "hidden"}`}
      onClick={() => setShowDialogBox(false)}
      >
          <div className='modal-content `modal bg-gray-600/50 p-4 rounded backdrop-blur-sm}`'
            onClick={(e) => e.stopPropagation()}
          >
              <h2 className='text-2xl text-center'>Create Task</h2>
              <form onSubmit={(e) => handleSubmit(e)}
               className='flex flex-col gap-2' 
               >
                <div className='flex flex-col gap-1'>
                    <label htmlFor="title" className='text-md font-semibold'>Title:</label>
                    <input 
                        type="text" 
                        id='title' 
                        name='title' 
                        placeholder='What needs to be done?'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='inputBase px-2 py-1'
                    />
                </div>


                <div className="dopdownSection grid grid-cols-2 gap-2">
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
                        <select 
                            name="category" id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        className='inputBase'
                        >
                            <option value="work" >Work</option>
                            <option value="personal" >Personal</option>
                            <option value="shopping" >Shopping</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="date" className='text-md font-semibold'>Due Date:</label>
                        <input 
                            type="date" id='date' name='date'
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        className='inputBase'
                        />
                    </div>
                </div>
                <div className='flex gap-3'>
                    <button 
                        onClick={() => setShowDialogBox(false)}
                        className='btn hoverBase'        
                    >Cancel</button>
                    <button 
                        onClick={() => setShowDialogBox(false)}
                        className='btn hoverBase'
                    >Create Task</button>
                </div>
              </form>
          </div>
      </div>
    </>
  )
}

export default AddTaskDialogBox
