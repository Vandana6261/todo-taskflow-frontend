import React, { useEffect, useState } from "react";
import { useTodo } from "../hooks/useTodo";
import useTodoContext from "../context/TodoContext";
import { MdCancel } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

// AddTaskDialogBox render

function AddTaskDialogBox({ showDialogBox, setShowDialogBox }) {
  const [error, setError] = useState("");
  const { addTask, categories } = useTodoContext();
  const [catId, setCatId] = useState({})

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    category: "work",
    dueDate: "",
  });

  useEffect(() => {
    if(categories && categories.length > 0) {
      setFormData(prev => (
        { ...prev, category: categories[0]._id }
      ))
    }
  }, [categories]);

  const today = new Date().toISOString().split("T")[0];
  const pattern = /^[A-Za-z ]+$/;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (value === "complete") {
      setFormData({ ...formData, [name]: value, isCompleted: true })
    }
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};
    if (formData.title == "") newError.title = "Title is required";
    if (!pattern.test(formData.title)) {
      newError.title = "Title is not valid, please use characters only";
    }
    if (!formData.description.trim())
      newError.description = "Description is required";
    if (!formData.category)
      newError.category = "Please choose one category";
    if (formData.dueDate < today) {
      newError.dueDate = "Please choose a valid date";
    }

    if (Object.keys(newError).length !== 0) {
      setError(newError);
      return;
    }
    console.log("formData", formData);
    addTask(formData);

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      category: categories[0]._id,
      dueDate: "",
    });

    newError = {};
    setError({});

    setShowDialogBox(false);
  };

  const handleCancel = () => {
    setShowDialogBox(false);

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      category: "work",
      dueDate: "",
    });

    setError({});
  };

  return (
    <>
      <div
        className={`min-w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-999 ${showDialogBox ? "flex" : "hidden"} text-left`}
        onClick={(e) => {
          handleCancel()
        }}
      >
        <div
          className="flex flex-col gap-1 w-[90%] max-w-[500px] h-auto modal bg-white rounded-xl p-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* 1st part */}
          <div className='flex-1 border-b border-gray-300 px-4 py-2 flex justify-between'
            onClick={(e) => {
              setShowDialogBox(false);
            }}
          >
            <h2 className="text-2xl text-center">Create Task</h2>
            <span 
              className='p-1 h-6 w-6 text-2xl rounded-full bg-gray-400/30 flex justify-center items-center cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gray-400/50'
              onClick={(e) => handleCancel(e)}
            >
              <RxCross1 />
            </span>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2 max-h-[70vh] relative"
            >
            {/* 2nd part */}
            <div className="overflow-y-auto">
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-md font-semibold">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="What needs to be done?"
                  value={formData.title}
                  className="inputBase px-2 py-1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {error && error.title && (
                  <p className="text-red-500">{error.title}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-md font-semibold">
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Add More Details....."
                  maxLength={300}
                  value={formData.description}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="inputBase px-2 py-1 h-12 overflow-y-auto"
                />
                {error && error.description && (
                  <p className="text-red-500">{error.description}</p>
                )}
              </div>

              <div className="dropdownSection grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-3">
                  <label htmlFor="priority" className="text-md font-semibold">
                    Priority:
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="inputBase px-2"
                  >
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="status" className="text-md font-semibold">
                    Status:
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="inputBase px-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="inProgress">Inprogress</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="category" className="text-md font-semibold">
                    Category:
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category._id}
                    className="inputBase px-2"
                    onChange={(e) => handleChange(e)}
                  >
                    {categories.map((item, index) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {error && error.category && (
                    <p className="text-red-500">{error.category}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="date" className="text-md font-semibold">
                    Due Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="dueDate"
                    value={formData.dueDate}
                    min={today}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="inputBase"
                  />
                  {error && error.dueDate && (
                    <p className="text-red-500">{error.dueDate}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* 3rd part  */}
            <div className="flex gap-3 self-end mt-2 relative bottom-0">
              <button
                type="button"
                onClick={(e) => handleCancel(e)}
                className="hoverBase btn mx-2 font-semibold bg-red-300/20 text-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="hoverBase btn mx-2 font-semibold bg-green-500/20 text-success"
                onClick={(e) => handleSubmit(e)}
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTaskDialogBox;
