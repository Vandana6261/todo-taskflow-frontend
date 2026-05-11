import React, { useRef } from 'react'
import { IoIosSearch } from "react-icons/io";
import useTodoContext from '../context/TodoContext';

// console.log("SearchBar rendered")

function SearchBar({setisLoading}) {
    const {searchTask, loadTodo} = useTodoContext()

    const timerRef = useRef(null);

    const handleSearch = (e) => {
      let val = e.target.value;
      
      if(timerRef.current) {
        clearTimeout(timerRef.current)
      }

      if(!val) {
        setTimeout(() => {
          loadTodo();
        }, 500)
        return;
      }

      timerRef.current = setTimeout(async () => {
        setisLoading(true);
        let response = await searchTask(val.trim());
        setisLoading(false);
      }, 2000)
    }

  return (
    <>
      <div className='w-1/2'>
        <form>
            <div tabIndex={0} className=' border border-gray-400 rounded-full flex items-center gap-2 px-2 cursor-pointer hover:shadow-[0px_0px_10px_rgba(0,15,205,0.4)] focus-within:border focus-within:border-blue-800/50 focus-within:shadow-[0px_0px_10px_rgba(0,15,205,0.4)]'>
                <span>
                    <IoIosSearch />
                </span>
                <input 
                className='py-2 px-4 border-none focus:border-none focus:outline-none w-full cursor-pointer'
                type="text" placeholder='Search' 
                onKeyUp={(e) => handleSearch(e)}
                />
            </div>
        </form>
      </div>
    </>
  )
}

export default SearchBar
