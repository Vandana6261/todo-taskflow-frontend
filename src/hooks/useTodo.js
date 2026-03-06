import { useEffect, useState } from "react";

  
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  export function useTodo() {

    const [tasks, setTasks] = useState([])
    const [taskToBeShow, setTaskToBeShow] = useState([])
    const [selectId, setSelectId] = useState(null);
    const [categories, setCategories] = useState([])
    // console.log(categories)
    

    async function loadTodo() {
      // console.log("loadTodo called")
      try {
        const response = await fetch("http://localhost:5000/api/todo")
        if(!response.ok) {
          console.log("Error status : ", response.status);
          console.log(response)
        }
        else {
          const data = await response.json();

          let filteredTask = data.todos.filter(item => !item.isDeleted);
          setTasks(prev => filteredTask)
          setTaskToBeShow(prev => filteredTask)
          setCategories(prev => [...data.categories])
        }
      } catch (error) {
        console.log("Error occured while loading TODO");
        console.log(error)
      }
    }

    async function loadCat() {
      try {
        const response = await fetch('http://localhost:5000/api/todo')
        if(!response.ok()) {
          console.log("Error status: ", response.status);
          return;
        }
        const data = await response.json();
        // setCategories(prev => data);

      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      loadTodo();
      // loadCat();
    }, [])

    async function addTask(task) {
      try {
        console.log("addTask called")
        const response = await fetch("http://localhost:5000/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task)
        })
        
        if(!response.ok) {
          console.log("Error response is not ok: ", response)
          console.log(response);
          return;
        }
          const data = await response.json();
          console.log(data, "data");
          await loadTodo();
      } catch (error) {
        console.log("Error occured while adding task");
        console.log(error)
      }
    }

    async function deleteTask(taskId, task) {
      // console.log("deleteTask is called", taskId);
      try {
        const response = await fetch(`http://localhost:5000/api/todo/${taskId}`, {
          method: "DELETE",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify(task)
        })
        if(!response.ok) {
          console.log("Error response is not ok: ", response.status);
          console.log(response)
          return;
        }
        else {
          const data = await response.json();
          await loadTodo();
        }
      } catch (error) {
        console.log("Error occured while deleting todo")
        console.log(error)
      }
    }

    async function updateTask(taskId, task) {
      console.log("Update task called")
      try {
        const response = await fetch(`http://localhost:5000/api/todo/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task)
        })

        if(!response.ok) {
          console.log("Error response is not ok: ", response.status);
          console.log(response);
          return;
        }
        else {
          const data = await response.json();
          await loadTodo()
        }
      } catch (error) {
        console.log("Error occured while updating todo: ", error.status);
        console.log(error)
      }
    }

    async function searchTask (keyword) {
      console.log("searchTaskCalled")
      try {
        const response = await fetch(`http://localhost:5000/api/todo/${keyword}`)
        if(!response.ok) {
          console.log("Error response is not ok: ", response.status);
          console.log(response);
          return;
        }
        else {
          const data = await response.json();
          setTaskToBeShow(prev => [...data])
        }
      } catch (error) {
        console.log("Error occured while searching task")
        console.log(error.message)
      }
    }

    async function addCategory (catName) {
      console.log("addCategory called")
      try {
        let response = await fetch('http://localhost:5000/api/todo/createCategory', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: catName})
        })

          if(!response.ok) {
            console.log("Error response is not okay ", response)
          }
          else {
            let data = await response.json()
            console.log(data, 155);
            console.log(categories)
            // setCategories(prev => [...prev], data)
            await loadTodo()
          }
      } catch (error) {
        console.log("Error occured while creating category: ", error)
      }
    }

    const filterTask = (cat) => {
      setTaskToBeShow(tasks);
      if(cat == 'all') {
        return;
      }
      cat.name = cat.name.toLowerCase();
      let arr = tasks.filter(item => {
        let category = item.category.name.toLowerCase()
        if(category.includes(cat.name)) {
          return item;
        }
      })
      setTaskToBeShow(arr)
    }

    return {
      loadTodo,
      addTask,
      tasks,
      deleteTask,
      updateTask,
      searchTask,
      selectId, setSelectId,
      taskToBeShow,
      categories, addCategory,
      setCategories,
      filterTask,
    };
  }

  
