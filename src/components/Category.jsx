import React from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import useTodoContext from '../context/TodoContext';


function Category() {
  const { categories, filterTask } = useTodoContext()

  const handleCat = (cat) => {
    console.log("Cat is clicked")
    filterTask(cat);
  }
  return (
    <>
      <div>
        {/* heading */}
        <div className='flex items-center gap-2 text-xl '>
          <span className='text-blue-500'>
            <FaRegFolderOpen />
          </span>
          <h2>Category</h2>
        </div>

        {/* category */}
        <div className='flex flex-col '>
          <div
            className='flex items-center gap-1 cursor-pointer'
            onClick={() => handleCat("all")}>
            <div className='rounded-full w-3 h-3 bg-blue-600 '></div>
            <h2>All</h2>
          </div>
          {categories.map((item, index) => {
            return (
              <div
                className='flex items-center gap-1 cursor-pointer'
                onClick={() => handleCat(item)}
              >
                <div className='rounded-full w-3 h-3 bg-blue-600 '></div>
                <h2>{item}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Category
