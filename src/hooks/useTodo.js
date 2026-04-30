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
  // console.log(categories)

  async function loadTodo() {
    console.log("loadTodo called")
    setLoading(true);
    try {
      const token = getToken("token")
      console.log(token)
      const response = await fetch("http://localhost:5000/api/todo/getTodo", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response, "response")
      if (!response.ok) {
        console.log("Error status : ", response.status);
        console.log(response);
      } else {
        const data = await response.json();
        if(data) {
          console.log(data, "data")
          let filteredTask = data.length ? data.todos.filter((item) => !item.isDeleted) : [];
          setTasks((prev) => filteredTask);
          setTaskToBeShow((prev) => filteredTask);
          // setCategories((prev) => [...data.categories]);
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
      const token = getToken("token");
      const response = await fetch("http://localhost:5000/api/todo/getCat", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response, "response");
      if (!response.ok()) {
        console.log("Error status: ", response.status);
        return;
      }
      const data = await response.json();
      setCategories(prev => data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // loadTodo();
    // loadCat();
  }, []);

  async function addTask(task) {
    try {
      console.log("addTask called");
      const response = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.log("Error response is not ok: ", response);
        console.log(response);
        return;
      }
      const data = await response.json();
      console.log(data, "data");
      await loadTodo();
    } catch (error) {
      console.log("Error occured while adding task");
      console.log(error);
    }
  }

  async function deleteTask(taskId, task) {
    // console.log("deleteTask is called", taskId);
    try {
      const response = await fetch(`http://localhost:5000/api/todo/${taskId}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
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
      const response = await fetch(`http://localhost:5000/api/todo/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
      const response = await fetch(`http://localhost:5000/api/todo/${keyword}`);
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
      let response = await fetch(
        "http://localhost:5000/api/todo/createCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: catName }),
        },
      );

      if (!response.ok) {
        console.log("Error response is not okay ", response);
      } else {
        let data = await response.json();
        console.log(data, 155);
        console.log(categories);
        // setCategories(prev => [...prev], data)
        await loadTodo();
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
      console.log(userData);
      let response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const loginResponse = await response.json();
      // if (isLoggedIn.success) return true;
      // return false;

      // ------

      if (loginResponse.success) 
      {
        const token = loginResponse.token;
        setUserData(loginResponse.user);
        console.log(loginResponse, 220);
        document.cookie = `token=${token}; path=/; max-age:86400`;
        return { success: true };
      } 
      else 
      {
        return { success: false };
      }

    } catch (error) {
      console.log("Error occured while creating User: ", error);
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
      console.log(loginResponse);

      if (loginResponse.success) 
      {
        const token = loginResponse.token;
        setUserData(loginResponse.user);

        document.cookie = `token=${token}; path="/"; max-age:86400`;
        return { success: true };
      } 
      else 
      {
        return { success: false };
      }
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
    console.log(userInfo);
  }


  function getToken(name) {           // name = "token"
    console.log("GetToken called");
    const cookieString = document.cookie;     // get all cookies in string
    const cookies = cookieString.split("; ");
    for(let cookie of cookies) 
    {
      // console.log(cookie);
      const [key, value] = cookie.split("=");
      
      if(key === name) return value;
    }
    return null;
  }

  return {
    loadTodo,
    loadCat,
    addTask,
    tasks,
    deleteTask,
    updateTask,
    searchTask,
    selectId,
    setSelectId,
    taskToBeShow,
    categories,
    addCategory,
    setCategories,
    filterTask,
    loading,
    isData,

    registerUser,
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
