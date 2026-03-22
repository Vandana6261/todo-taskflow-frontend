import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'
import TodoApp from './components/TodoApp'
import { TodoProvider } from './context/TodoContext'
import SignUp from './components/SignUp'

function App() {

  return (
    <>
      {/* <div>hello</div> */}
      {/* <TaskList /> */}
      <TodoProvider>
        <TodoApp />

        {/* <SignUp /> */}
      </TodoProvider>
    </>
  )
}

export default App
