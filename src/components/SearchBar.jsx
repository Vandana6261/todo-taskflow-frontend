import React, { useRef } from 'react'
import { IoIosSearch } from "react-icons/io";
import useTodoContext from '../context/TodoContext';

function SearchBar({ setisLoading }) {

  const searchStyle = `flex items-center gap-2 px-3.5 bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-[0px_0px_10px_rgba(0,15,205,0.4)] focus-within:border focus-within:border-blue-800/50 focus-within:shadow-[0px_0px_10px_rgba(0,15,205,0.4)]`;

  const { searchTask, loadTodo } = useTodoContext()
  const timerRef = useRef(null);

  const handleSearch = (e) => {
    let val = e.target.value;
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!val) {
      setTimeout(() => { loadTodo(); }, 400)
      return;
    }

    timerRef.current = setTimeout(async () => {
      setisLoading(true);
      await searchTask(val.trim());
      setisLoading(false);
    }, 600)
  }

  return (
    <div className='w-full max-w-sm  '>
      <div className={searchStyle}>
        <span className="text-gray-400 text-lg">
          <IoIosSearch />
        </span>
        <input 
          className='py-2.5  border-none focus:outline-none w-full text-sm text-gray-700 placeholder-gray-500'
          type="text" 
          placeholder='Search tasks...' 
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchBar;