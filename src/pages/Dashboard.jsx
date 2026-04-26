import React from 'react'
import useTodoContext from '../context/TodoContext'

async function loadProfile() {
  const cookieString = document.cookie;     // get all cookies in string
  console.log(cookieString);
  const cookies = cookieString.split("; ");
  for (let cookie of cookies) {
    // console.log(cookie);
    const [key, value] = cookie.split("=");

    if (key === "token") {
      
    }
  }
}

function Dashboard() {
  const { getToken } = useTodoContext()
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
