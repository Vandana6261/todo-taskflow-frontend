import { useEffect, useState } from "react";

  
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  export function useTodo() {

    const [tasks, setTasks] = useState([])
    const [taskToBeShow, setTaskToBeShow] = useState([])
    const [selectId, setSelectId] = useState(null);
    const [categories, setCategories] = useState([])
    

    async function loadTodo() {
      // console.log("loadTodo called")
      try {
        const response = await fetch("http://localhost:5000/api/todo")
        if(!response.ok) {
          console.log("Internal server Error");
          console.log("Error status : ", response.status);
        }
        else {
          const data = await response.json();
          setTasks(prev => [...data])
          setTaskToBeShow(prev => [...data])
          setCategories(prev => data.map(todo => todo.category))
        }
      } catch (error) {
        console.log("Error occured while loading TODO");
        console.log(error)
      }
    }

    useEffect(() => {
      loadTodo();
    }, [])

    async function addTask(task) {
      try {
        // console.log("addTask called")
        const response = await fetch("http://localhost:5000/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task)
        })
        
        if(!response.ok) {
          console.log("Error response is not ok: ", response.status)
          return;
        }
        else {
          const data = await response.json();
          await loadTodo();
        }
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
      // console.log("Update task called")
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

    const filterTask = (cat) => {
      if(cat == 'all') {
        setTaskToBeShow(tasks);
        return;
      }
      let arr = tasks.filter(item => {
        cat = cat.toLowerCase();
        let category = item.category.toLowerCase()
        // console.log(item)
        if(category.includes(cat)) {
          return item;
        }
      })
      // console.log(arr)
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
      categories,
      filterTask,
    };
  }

  
