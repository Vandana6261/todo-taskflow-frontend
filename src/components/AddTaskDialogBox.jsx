import React, { useState } from 'react'
import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'


function AddTaskDialogBox({ showDialogBox, setShowDialogBox }) {
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        category: "",
        dueDate: "",
    })

    const { addTask } = useTodoContext()

    const today = new Date().toISOString().split("T")[0];
    const pattern = /[^A-Za-z ]/g;

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newError = {};
        if (formData.title == "") newError.title = "Title is required"
        if (pattern.test(formData.title)) {
            newError.title = "Title is not valid, please use characters only";
        }
        if (!formData.description.trim()) newError.description = "Description is required"
        if (formData.dueDate < today) {
            newError.dueDate = "Please choose a valid date"
        }

        if (Object.keys(newError).length !== 0) {
            setError(newError);
            return;
        }
        
        addTask(formData)

        setFormData({
            title: "",
            description: "",
            priority: "medium",
            status: "pending",
            category: "",
            dueDate: "",
        })

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
                                value={formData.title}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                className='inputBase px-2 py-1'
                            />
                            {error && error.title && <p className='text-red-500'>{error.title}</p>}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="description" className='text-md font-semibold'>Description:</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder='Add More Details.....'
                                maxLength={300}
                                value={formData.description}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                className='inputBase px-2 py-1 h-12 overflow-y-auto'
                            />
                            {error && error.description && <p className='text-red-500'>{error.description}</p>}
                        </div>


                        <div className="dropdownSection grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className='flex flex-col gap-3'>
                                <label htmlFor="priority" className='text-md font-semibold'>Priority:</label>
                                <select
                                    name="priority" id="priority"
                                    value={formData.priority}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
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
                                    value={formData.status}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
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
                                    value={formData.category}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    className='inputBase px-2 py-1'
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label htmlFor="date" className='text-md font-semibold'>Due Date:</label>
                                <input
                                    type="date" id='date' name='dueDate'
                                    value={formData.dueDate}
                                    min={today}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                    className='inputBase'
                                />
                                {error && error.dueDate && <p className='text-red-500'>{error.dueDate}</p>}
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
