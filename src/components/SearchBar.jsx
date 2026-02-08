import React from 'react'
import { IoIosSearch } from "react-icons/io";
import useTodoContext from '../context/TodoContext';

function SearchBar() {
    const {searchTask} = useTodoContext()
    const {  } = useTodoContext()

    const handleSearch = (e) => {
        let val = e.target.value.trim().toLowerCase();
        // console.log(val)
        searchTask(val.trim());
    }

  return (
    <>
      <div className=''>
        <form>
            <div tabIndex={0} className=' w-[30%] border border-gray-400 rounded flex items-center gap-2 px-2 focus-within:border focus-within:border-red-400 '>
                <span>
                    <IoIosSearch />
                </span>
                <input 
                className='py-2 px-4 border-none focus:border-none focus:outline-none'
                type="text" placeholder='Search' 
                onChange={(e) => handleSearch(e)}
                />
            </div>
        </form>
      </div>
    </>
  )
}

export default SearchBar
