// @ts-nocheck
import React, { useEffect, useState } from 'react'

import { useTodo } from '../hooks/useTodo'
import useTodoContext from '../context/TodoContext'
import UpdateTodo from './UpdateTodo'
import { createPortal } from 'react-dom'
import Confirmation from './Confirmation'
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

// console.log("TaskItem rendered")

function TaskItem({ task }) {

  const { tasks, updateTask, setSelectId, deleteTask } = useTodoContext()
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [updatedData, setUpdatedData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const styleMap = {
    complete: "text-[#10B981]",
    inProgress: " text-[#3B82F6]",
    pending: " text-[#F59E0B]"
  }

  const handleUpdate = () => {
    setSelectId(task._id)
    setIsUpdate(!isUpdate)
    const taskToBeUpdated = tasks.find((eachTask) => eachTask._id === task._id);
    setUpdatedData(taskToBeUpdated)
  }

  const handleDelete = async () => {
    const response = await deleteTask(task._id, { ...task, isDeleted: true });
  }

  useEffect(() => {
  }, [isCompleted])

  return (
    <>
      <div
        tabIndex={0}
        onClick={() => setSelectId(task._id)}
        className="group bg-todoCard rounded-xl border border-transparent p-4 m-1 text-sm shadow-[0px_5px_10px_2px_rgba(0,0,0,0.25)] hover:shadow-[0px_8px_16px_rgba(0,0,0,0.3)] hover:border-gray-400 transition-all cursor-pointer"
      >
        {/* Top row: checkbox + title (left) | edit + delete (right) */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              checked={isCompleted}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const status = task.status !== "complete" ? "complete" : "inProgress";
                updateTask(task._id, { ...task, isCompleted: e.target.checked, status })
                setIsCompleted(e.target.checked)
              }}
              className="mt-1 h-4 w-4 cursor-pointer shrink-0 accent-button"
            />
            <h2
              className={`text-base font-semibold text-text truncate ${
                isCompleted ? "line-through text-gray" : ""
              }`}
            >
              {task.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Update task"
              disabled={isCompleted}
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate();
              }}
              className="h-8 w-8 grid place-items-center rounded-lg text-success/70 hover:bg-success/15 hover:text-success disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <GrUpdate className="text-lg" />
            </button>
            <button
              type="button"
              aria-label="Delete task"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="h-8 w-8 grid place-items-center rounded-lg text-danger/70 hover:bg-danger/15 hover:text-danger transition-colors"
            >
              <MdDeleteForever className="text-lg" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className={`mt-2 text-muted ${isCompleted ? "line-through" : ""}`}>
          {task.description}
        </p>

        {/* Category + status */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {task.category && (
            <span className="bg-gray-400/30 text-text/80 text-[11px] px-2 py-0.5 rounded">
              {task.category.name}
            </span>
          )}
          {task.status && (
            <span
              className={`text-xs font-semibold px-3 py-0.5 rounded ${styleMap[task.status]}`}
            >
              {task.status}
            </span>
          )}
        </div>

        {/* Due date */}
        {task.dueDate && (
          <div className="mt-3 pt-2 border-t border-gray-400/20">
            <small className="text-gray-400">Due: {task.dueDate}</small>
          </div>
        )}
      </div>

      {/* UpdateTodo (update) */}
      {createPortal(
        isUpdate ? <UpdateTodo isUpdate={isUpdate} setIsUpdate={setIsUpdate} updatedData={updatedData} setUpdatedData={setUpdatedData} /> : "",
        document.body
      )}
      {/* confirmation (delete) */}
      <div>
        {createPortal(
          isOpen ? <Confirmation setIsOpen={setIsOpen} handleConfirmation={handleDelete} text={"Delet this todo"} /> : "", document.body
        )}
      </div>
    </>
  )
}

export default TaskItem

