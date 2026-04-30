import React, { useState } from 'react'
import useTodoContext from '../context/TodoContext'
import { useLoaderData } from 'react-router-dom';
import TaskList from '../components/TaskList';
import Category from '../components/Category';

import { GiHamburgerMenu } from "react-icons/gi";
import { FiCheckSquare } from "react-icons/fi";

export async function loadProfile({ request }) {
  const cookieHeader = request.headers.get("cookie");

  let token = 3;

  if (cookieHeader) {
    const cookies = cookieHeader.split("; ");

    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === "token") {
        token = value;
      }
    }
  }

  console.log("Token:", token);

  return { token };
}

function Dashboard() {
  // const { getToken } = useTodoContext()
  const {userInfo} = useLoaderData();
  console.log(userInfo, "userInfo");

  const [showCategory, setShowCategory] = useState(false)

  return (
     <>
      <h2>Hello</h2>
    </>
  )
}

export default Dashboard
