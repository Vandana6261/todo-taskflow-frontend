
// main content here filter + todos + Add Task Button.

import React, { useState } from 'react'
import AddTaskDialogBox from './AddTaskDialogBox'

function TaskList() {
    const [showDialogBox, setShowDialogBox] = useState(false);
  return (
    <>
      <div className='max-w-screen min-h-screen bg-transparent'>
        <button 
        onClick={() => setShowDialogBox(true)}
        className='btn hoverBase'
        >Add Task</button>

          <AddTaskDialogBox showDialogBox={showDialogBox} setShowDialogBox={setShowDialogBox}/>
      </div>
    </>
  )
}

export default TaskList
