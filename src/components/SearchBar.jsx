import React, { useRef } from 'react'
import { IoIosSearch } from "react-icons/io";
import useTodoContext from '../context/TodoContext';

// console.log("SearchBar rendered")

function SearchBar() {
    const {searchTask} = useTodoContext()
    const {  } = useTodoContext()

    const timerRef = useRef(null);
    
    let timerVal;
    const handleSearch = (e) => {
      let val = e.target.value;
      clearTimeout(timerVal)
      if(!val) {
        return;
      }
      timerVal = setTimeout(() => {
        searchTask(val.trim());
      }, 3000)
    }

  return (
    <>
      <div className=''>
        <form>
            <div tabIndex={0} className='w-[80%]  md:w-[60%] border border-gray-400 rounded flex items-center gap-2 px-2 focus-within:border focus-within:border-blue-800/50'>
                <span>
                    <IoIosSearch />
                </span>
                <input 
                className='py-2 px-4 border-none focus:border-none focus:outline-none'
                type="text" placeholder='Search' 
                // onChange={(e) => handleSearch(e)}
                onKeyUp={(e) => handleSearch(e)}
                />
            </div>
        </form>
      </div>
    </>
  )
}

export default SearchBar
