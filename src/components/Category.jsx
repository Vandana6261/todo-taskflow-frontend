import React, { useState, useMemo } from 'react'
import { FaRegFolderOpen, FaPlus } from "react-icons/fa";
import useTodoContext from '../context/TodoContext';
import Loader from './Loader';

function Category() {

  const { loadTodo, categories, addCategory, filterTask, loadCat } = useTodoContext()
  const [isAddCat, setIsAddCat] = useState(false)
  const [catName, setCatName] = useState("")
  const [error, setError] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  

  const handleCat = async (cat) => {
    console.log(selectedCat)
    setIsLoading(prev => !prev)
    if (cat == "all") {
      await loadTodo()
      await loadCat()
      setSelectedCat(cat)
      setIsLoading(prev => !prev)
      return;
    }
    setSelectedCat(cat._id);
    filterTask(cat);
    setIsLoading(prev => !prev)
  }

  const addCat = (cat) => {
    if(!cat) {
      setError("Please add one category name")
      return;
    }
    let isFound = categories.find(item => item.name == cat);
    if(isFound) {
      setError("Category exists")
      return;
    }
    setIsAddCat(false);
    setCatName("")
    setError("")
    addCategory(cat);
  }

  const getRandomColorCode = () => {
    let str = "1234567890ab";
    let color = "#"
    
    for(let i=0; i<6; i++) {
      let idx = Math.floor(Math.random() * str.length)
      color += str[idx];
    }

    return color;
  }

  const categoryColor = useMemo(() => {
    const colorMap = {};

    categories.forEach(item => {
      colorMap[item._id] = getRandomColorCode();
    })

    return colorMap;
  }, [categories])

  return (
        <div className='min-h-[85vh] relative flex flex-col justify-between p-2 select-none'>
          <div>
            {/* Heading */}
            <div className='flex items-center gap-2 text-xl font-semibold text-gray-700 px-2 py-3 mb-2'>
              <span className='text-blue-600 transition-transform duration-300 hover:rotate-12'>
                <FaRegFolderOpen />
              </span>
              <h2>Category</h2>
            </div>

            {/* Categories List */}
            {
              isLoading ? 
              <h2>Loading....</h2>
              :
            <div className='flex flex-col gap-1.5'>
              <div
                className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 ${
                  selectedCat === "all"
                    ? "bg-white text-blue-600 shadow-sm border border-blue-100"
                    : "text-gray-600 hover:bg-gray-100/80"
                }`}
                onClick={() => handleCat("all")}
              >
                <div className={`rounded-full w-2.5 h-2.5 transition-all duration-300 ${selectedCat === "all" ? "bg-blue-600 scale-125" : "bg-gray-400"}`}></div>
                <h2 className="text-sm font-medium">All Tasks</h2>
              </div>

              {categories.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No categories added yet</p>
              ) : (
                categories.map((item) => {
                  const color = categoryColor[item._id];
                  const isSelected = selectedCat === item._id;
                  return (
                    <div
                      key={item._id}
                      className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 ${
                        isSelected
                          ? "bg-white text-blue-600 shadow-sm border border-blue-100"
                          : "text-gray-600 hover:bg-gray-100/80"
                      }`}
                      onClick={() => handleCat(item)}
                    >
                      <div
                        className="rounded-full w-2.5 h-2.5 transition-transform duration-300"
                        style={{ backgroundColor: color, transform: isSelected ? 'scale(1.25)' : 'scale(1)' }}
                      ></div>
                      <span className='text-sm font-medium line-clamp-1'>{item.name}</span>
                    </div>
                  )
                })
              )}
            </div>
            }
          </div>

          {/* Dynamic Action Section (Bottom Anchor) */}
          <div className="w-full mt-4">
            {isAddCat ? (
              <div className='bg-[#a4acbdd5] border border-gray-100 rounded-2xl p-3 shadow-xl shadow-gray-200/50 animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col gap-3'>
                <input
                  type="text"
                  className='w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none px-3 py-2 text-sm text-gray-700 rounded-xl transition-all duration-200'
                  placeholder='Category name...'
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  autoFocus
                />
                {error && <p className='text-xs text-red-500 font-medium px-1 animate-pulse'>{error}</p>}

                <div className='flex items-center justify-end gap-2 text-xs'>
                  <button
                    className='px-3 py-1.5 font-medium rounded-lg text-gray-500 hover:bg-gray-100 transition-colors'
                    onClick={() => { setIsAddCat(false); setError(""); setCatName(""); }}
                  >Cancel</button>
                  <button
                    className='px-4 py-1.5 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors'
                    onClick={() => addCat(catName)}
                  >Add</button>
                </div>
              </div>
            ) : (
              <button
                className='flex items-center justify-center gap-2 w-full py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform active:scale-[0.98] shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300'
                onClick={() => setIsAddCat(true)}
              >
                <FaPlus className="text-xs" />
                <span>Add Category</span>
              </button>
            )}
          </div>
    </div>
  )
}

export default Category;