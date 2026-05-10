import { useEffect, useState } from "react";

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
      const token = await getToken();
      const response = await fetch("http://localhost:5000/api/todo/getTodo", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        console.log("Error status : ", response.status);
        console.log(response);
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
      const token = await getToken();
      const response = await fetch("http://localhost:5000/api/todo/getCat", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
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

  useEffect(() => {
    // loadTodo();
    // loadCat();
  }, []);

  async function addTask(task) {
    try {
      const token = await getToken();
      console.log("addTask called");
      const response = await fetch("http://localhost:5000/api/todo/createTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
      const token = await getToken();
      const response = await fetch(`http://localhost:5000/api/todo/${taskId}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
      const token = await getToken();
      const response = await fetch(`http://localhost:5000/api/todo/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
      const token = await getToken();
      const response = await fetch(`http://localhost:5000/api/todo/${keyword}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        console.log("Error response is not ok: ", response.status);
        console.log(response);
        return;
      } else {
        const data = await response.json();
        setTaskToBeShow((prev) => [...data]);
        if (data.length === 0) setIsData(false);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error occured while searching task");
      console.log(error.message);
    }
  }

  async function addCategory(catName) {
    console.log("addCategory called");
    try {
      const token = await getToken();
      let response = await fetch(
        "http://localhost:5000/api/todo/createCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
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
      return;
    }
    cat.name = cat.name.toLowerCase();
    let arr = tasks.filter((item) => {
      let category = item.category.name.toLowerCase();
      if (category.includes(cat.name)) {
        return item;
      }
    });
    setTaskToBeShow(arr);
  };

  // ---------------------------------------------------------------------------------------------------------------------

  async function registerUser(userData) {
    try 
    {
      let response = await fetch("http://localhost:5000/api/user/send-otp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const isRegister = await response.json();
      if(!isRegister.success) {
        return {success: false};
      }

      localStorage.setItem("token", JSON.stringify(isRegister.token))
      return { success: true };
      // if (isLoggedIn.success) return true;
      // return false;

      // ------

      // if (loginResponse.success) 
      // {
      //   const token = loginResponse.token;
      //   setUserData(loginResponse.user);
      //   console.log(loginResponse, 220);
        // localStorage.setItem("token", JSON.stringify(token))
        // return { success: true };
      // } 
      // else 
      // {
      //   return { success: false };
      // }

    } catch (error) {
      console.log("Error occured while creating User: ", error);
    }
  }

  async function varifyOtp(otp) {
    try {
      const token = getToken("token");
      const response = await fetch("http://localhost:5000/api/user/varifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
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
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const loginResponse = await response.json();

      if (loginResponse.success) 
      {
        const token = loginResponse.token;
        setUserData(loginResponse.user);

        // document.cookie = `token=${token}; path="/"; max-age:86400`;
        await localStorage.setItem("token", JSON.stringify(token))
      }
      return loginResponse;
    } catch (error) {
      console.log("Error occurred while creating: ", error);
    }
  }

  async function getProfile(data) {
    console.log("getProfile called");
    const token = await getToken("token")
    const response = await fetch("http://localhost:5000/api/user/profile", {
      method: "GET",
      headers : {
        "Authorization": `Bearer ${token}`
      }
    });
    const userInfo = await response.json();
  }


  function getToken(name) {           // name = "token"
    console.log("GetToken called");
    const token = JSON.parse(localStorage.getItem("token")) || "";
    return token;
  }

  return {
    loadTodo,
    loadCat,
    addTask,
    tasks,
    setTasks,
    deleteTask,
    updateTask,
    searchTask,
    selectId,
    setSelectId,
    taskToBeShow,
    setTaskToBeShow,
    categories,
    addCategory,
    setCategories,
    filterTask,
    loading,
    isData,

    registerUser,
    varifyOtp,

    loginUser,
    getProfile,
    getToken
  };
}

// {
//   message: "User register successfully";
//   success: true;
//   user: {
//     __v: 0;
//     _id: "69e2027c2633e59f4860f44b";
//     email: "a@gmail.com";
//     firstName: "Anish";
//     lastName: "Patidar";
//     mobileNo: "9752131385";
//     password: "$2b$10$neoTXHRMfE1v1EEhG2z8UuTjpgYoZFhaXU0WLDb0Nn2y.VaGxTNnS";
//   }
// }
