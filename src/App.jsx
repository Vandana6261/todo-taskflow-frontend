import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'
import TodoApp from './components/TodoApp'
import { TodoProvider } from './context/TodoContext'
// import SignUp from './components/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
// import ErrorBoundary from './pages/ErrorBoundary'


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/signUp",
          element: <SignUp />
        },
        {
          path: "/login",
          element: <Login />
        },
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      // loader: 
    }
  ])

  return (
    <>
      {/* <ErrorBoundary> */}
        <TodoProvider>
          <RouterProvider router={router} />
          {/* <TodoApp /> */}
        </TodoProvider>
      {/* </ErrorBoundary> */}
    </>
  )
}

export default App




{/* <div>hello</div> */ }
{/* <TaskList /> */ }
{/* <TodoProvider>
  <TodoApp />
</TodoProvider> */}
{/* <Dashboard /> */ }
{/* <SignUp /> */ }