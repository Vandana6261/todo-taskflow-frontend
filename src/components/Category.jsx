import React from 'react'
import { FaRegFolderOpen } from "react-icons/fa";


function Category() {
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
        <div>
            
        </div>
      </div>
    </>
  )
}

export default Category
