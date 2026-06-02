import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { customFetch } from "../utils/api";

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useTodo() {
  const [tasks, setTasks] = useState([]);
  const [taskToBeShow, setTaskToBeShow] = useState([]);
  const [selectId, setSelectId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [userData, setUserData] = useState({});

  async function loadTodo() {
    console.log("loadTodo called")
    setLoading(true);
    try {
      const response = await customFetch(`${BASE_URL}/api/todo/getTodo`, {
        method: "GET"
      });
      if (!response.ok) {
        console.log("Error status : ", response.status);
      } else {
        const data = await response.json();
        if(data) {
          setTasks(data);
          setTaskToBeShow(data);
          setLoading(false);
          setIsData(true);
        }
      }
    } catch (error) {
      console.log("Error occured while loading TODO");
      console.log(error);
    }
  }

  async function loadCat() {
    console.log("loadCat called")
    try {
      const response = await customFetch(`${BASE_URL}/api/todo/getCat`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("Error status: ", response.status);
        return;
      }
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.log("Error occured while loadCat")
      console.log(error);
    }
  }


  async function addTask(task) {
    try {
      console.log("addTask called");
      const response = await customFetch(`${BASE_URL}/api/todo/createTodo`, {
        method: "POST",
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.log("Error response is not ok: ", response);
        console.log(response);
        return;
      }
      const data = await response.json();
      await loadTodo();
    } catch (error) {
      console.log("Error occured while adding task");
      console.log(error);
    }
  }

  async function deleteTask(taskId, task) {
    // console.log("deleteTask is called", taskId);
    try {
      const response = await customFetch(`${BASE_URL}/api/todo/${taskId}`, {
        method: "DELETE",
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        console.log("Error response is not ok: ", response.status);
        console.log(response);
        return;
      } else {
        const data = await response.json();
        await loadTodo();
      }
    } catch (error) {
      console.log("Error occured while deleting todo");
      console.log(error);
    }
  }

  async function updateTask(taskId, task) {
    console.log("Update task called");
    try {
      const response = await customFetch(`${BASE_URL}/api/todo/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.log("Error response is not ok: ", response.status);
        console.log(response);
        return;
      } else {
        const data = await response.json();
        await loadTodo();
      }
    } catch (error) {
      console.log("Error occured while updating todo: ", error.status);
      console.log(error);
    }
  }

  async function searchTask(keyword) {
    console.log("searchTaskCalled");
    setLoading(true);
    setTaskToBeShow([]);
    try {
      const response = await customFetch(`${BASE_URL}/api/todo/${keyword}`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("Error response is not ok: ", response.status);
        console.log(response);
        return false;
      } else {
        const data = await response.json();
        setTaskToBeShow((prev) => [...data.todo]);
        if (data.length === 0) setIsData(false);
        return data.success
      }
    } catch (error) {
      console.log("Error occured while searching task");
      console.log(error.message);
    }
  }

  async function addCategory(catName) {
    console.log("addCategory called");
    try {
      let response = await customFetch(
        `${BASE_URL}/api/todo/createCategory`,
        {
          method: "POST",
          body: JSON.stringify({ name: catName }),
        },
      );

      if (!response.ok) {
        console.log("Error response is not okay ", response);
      } else {
        let data = await response.json();
        // console.log(categories);
        console.log(data)
        setCategories(prev => [...prev, data])
        // await loadTodo();
      }
    } catch (error) {
      console.log("Error occured while creating category: ", error);
    }
  }

  const filterTask = (cat) => {
    setTaskToBeShow(tasks);
    if (cat == "all") {
      return tasks;
    }
    cat.name = cat.name.toLowerCase();
    let arr = tasks.filter((item) => {
      let category = item.category.name.toLowerCase();
      if (category == cat.name) {
        return item;
      }
    });
    setTaskToBeShow(arr);
  };

  // ---------------------------------------------------------------------------------------------------------------------

  async function registerUser(userData) {
    try 
    {
      let response = await customFetch(`${BASE_URL}/api/user/send-otp`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const isRegister = await response.json();
      if(!isRegister.success) {
        return {success: false, message: isRegister.message};
      }

      return { success: true, message: isRegister.message };
   

    } catch (error) {
      console.log("Error occured while creating User: ", error);
    }
  }

  async function varifyOtp(otp) {
    try {
      const response = await customFetch(`${BASE_URL}/api/user/varifyOtp`, {
        method: "POST",
        body: JSON.stringify({otp})
      })

      const isVarified = await response.json();
      setUserData(isVarified.user);
      
      return isVarified;
    } catch (error) {
      console.log(error)
    }
  }

  async function loginUser(userData) {
    try {
      console.log(userData);
      const response = await customFetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      const loginResponse = await response.json();

      if (loginResponse.success) 
      {
        setUserData(loginResponse.user);
      }
      return loginResponse;
    } catch (error) {
      console.log("Error occurred while creating: ", error);
    }
  }

  async function logout() {
    try {
      let response = await customFetch(`${BASE_URL}/api/user/logout`, {
        method: "POST",
      });

      const logoutResponse = await response.json();
    } catch (error) {
      console.log("Error occurred while logout: ", error);
    }
  }

  async function getProfile(data) {
    console.log("getProfile called");
    const response = await customFetch(`${BASE_URL}/api/user/profile`, {
      method: "GET",
    });
    const userInfo = await response.json();
  }




  return {
    loadTodo,
    loadCat,
    addTask,
    deleteTask,
    updateTask,
    searchTask,
    addCategory,
    filterTask,

    tasks,
    setTasks,
    loading,
    isData,
    taskToBeShow,
    setTaskToBeShow,
    categories,
    setCategories,
    selectId,
    setSelectId,

    registerUser,
    varifyOtp,
    loginUser,
    logout,
    getProfile,
  };
}
