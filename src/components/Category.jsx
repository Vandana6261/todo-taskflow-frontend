import React, { useState, useEffect } from 'react'
import { FaRegFolderOpen } from "react-icons/fa";
import useTodoContext from '../context/TodoContext';
import { FaPlus } from "react-icons/fa";

// console.log("Category rendered")

function Category() {
  const { loadTodo, categories, addCategory, filterTask } = useTodoContext()
  const [isAddCat, setIsAddCat] = useState(false)
  const [catName, setCatName] = useState("")
  const [error, setError] = useState("")
  const [selectedCat, setSelectedCat] = useState("all")

  const handleCat = (cat) => {
    console.log(selectedCat)
    if (cat == "all") {
      loadTodo()
      setSelectedCat(cat)
      return;
    }
    setSelectedCat(cat._id);
    filterTask(cat);
  }
  
  const addCat = (cat) => {
    if(!cat) {
      setError("Please add one category name")
      return;
    }
    let isFound = categories.find(item => item.name == cat);
    if(isFound) {
        setError("Cat exists")
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

  // getRandomColorCode();



  return (
    <>
      <div className='min-h-[85vh] relative'>
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
            className={`flex items-center gap-1 cursor-pointer px-1 m-1 onHoverEffect rounded-full  ${selectedCat === "all" ? "bg-[#ffffff] shadow-[0_0_0_2px_rgba(59,130,246,0.6)]": "bg-transparent"} `}
            onClick={() => handleCat("all")}>
            <div className={`rounded-full w-3 h-3 bg-blue-600 ${selectedCat} === "all" ? bg-[#ffffff]`}></div>
            <h2>All</h2>
          </div>
          {
            categories.length == 0 ?
              <p>No category to display</p>
              :

              // }
              (categories.map((item, index) => {
                const color = getRandomColorCode();
                return (
                  <div
                    key={item._id}
                    className='flex flex-col p-1 '
                    onClick={() => handleCat(item)}
                  >
                    <div className={`flex items-center gap-2 cursor-pointer px-1 onHoverEffect rounded-full ${selectedCat === item._id ? "bg-[#ffffff] shadow-[0_0_0_2px_rgba(59,130,246,0.6)]": "bg-transparent"} `}>
                      <div className={`rounded-full w-3 h-3 bg-[${color}]`}
                        style={{backgroundColor: color}}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                  </div>
                )
              }))
          }
        </div>

        {isAddCat ?

          <div className='absolute bottom-0 min-w-[90%]'>
              <div className='flex flex-col gap-2'>
                <input type="text" 
                  className='inputBase bg-[#ffffff] px-2 py-1 font-semibold cursor-pointer text-gray-600 border-gray-400 rounded-xl shadow-[0px_10px_30px_10px_rgba(0,0,0,0.25)]  focus-within:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.25)] text-sm '
                  placeholder='Enter Category to add'
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                />
                {error && <p className='text-red-500'>{error}</p>}

                <div className='flex items-center justify-around '>
                  <button className='hoverBase btn mx-2 font-semibold rounded-full bg-red-500/20 text-red-600'
                    onClick={() => {
                      setIsAddCat(false)
                      setError("")
                      setCatName("")
                    }}
                  >Cancel</button>
                  <button className='hoverBase btn mx-2 font-semibold rounded-full bg-green-500/20 text-[#229c09] w-24'
                    onClick={() => addCat(catName)}
                  >Add</button>
                </div>
              </div>
          </div>

          :

          <div className='absolute bottom-0 min-w-[90%]'
            onClick={() => setIsAddCat(true)}
          >
            <div className='flex items-center btn hoverBase w-full py-2 text-white font-semibold rounded-full border-gray-600 gap-2 bg-[#0019f7a8] hover:shadow-[0px_0px_20px_rgba(0,15,205,0.4)]'>
              <FaPlus />
              <button className='' onTouchMove={() => console.log("ggh")}>Add Category</button>
            </div>
          </div>
        }

      </div>
    </>
  )
}

export default Category

