import { useState } from "react";


  const defaultTask =  
  [
    {
      id: "1",
      title: "Review project proposal",
      description:
        "Go through the Q1 project proposal and provide feedback to the team.",
      priority: "high",
      status: "pending",
      category: "Work",
      dueDate: "2026-02-01",
      isCompleted: false,
      createdAt: new Date(Date.now() - 86400000), // yesterday date
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, bread, vegetables",
      priority: "medium",
      status: "Inprogress",
      category: "Personal",
      isCompleted: true,
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      title: "Morning workout",
      priority: "low",
      status: "complete",
      category: "Shopping",
      isCompleted: true,
      createdAt: new Date(Date.now() - 259200000),
    },
  ];

  
  const generateId = () => Math.random().toString(36).substring(2, 9);
  // const category = ["work", "personal", "shopping"]
  
  export function useTodo() {

    const [tasks, setTasks] = useState(defaultTask)
    const [taskToBeShow, setTaskToBeShow] = useState(tasks)
    const [selectId, setSelectId] = useState(null);
    const [categories, setCategories] = useState(["work", "personal", "shopping"])
    
    const addTask = (task) => {
      // console.log(task);
      let newTask = {
        ...task,
        id: generateId(),
        isCompleted: false,
        createdAt: new Date().toLocaleDateString()
      }
      setCategories(prev => [...prev, newTask.category]);
      setTasks(prev => [...prev, newTask]);
      setTaskToBeShow(prev => [...prev, newTask]);
      if(!categories.includes(task.category)) {
        setCategories(prev => [...prev, task.category])

      }
    }
    // console.log(tasks)

    const deleteTask = (taskId) => {
      let newTasks = tasks.filter(item => item.id !== taskId);
      setTasks(newTasks)
    }

    const updateTask = (task) => {
      let newTasks = tasks.map(eachTask => {
        if(eachTask.id === task.id) {
          return {...task}
        } 
        else return eachTask;
      })
      setTasks(newTasks);
      setTaskToBeShow(newTasks)
    }

    const searchTask = (text) => {
      if(text == "") {
        setTaskToBeShow(tasks);
        return;
      }
      // console.log(categories)
      let arr = tasks.filter(item => {
        let title = item.title ? item.title.toLowerCase() : ""
        let description = item.description ? item.description.toLowerCase() : ""

        if(title.includes(text) || description.includes(text)) {
          return item;
        }
      })
      console.log(arr)
      setTaskToBeShow(arr);
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
      addTask,
      tasks,
      deleteTask,
      updateTask,
      searchTask,
      selectId, setSelectId,
      taskToBeShow,
      categories,
      filterTask
    };
  }

  
