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
      catagoryId: "1",
      dueData: new Date(),
      createdAt: new Date(Date.now() - 86400000), // yesterday date
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, bread, vegetables",
      priority: "medium",
      status: "in-progress",
      categoryId: "3",
      dueDate: new Date(Date.now() + 86400000),
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      title: "Morning workout",
      priority: "low",
      status: "completed",
      categoryId: "2",
      createdAt: new Date(Date.now() - 259200000),
    },
  ];

  
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  export function useTodo() {

    const [tasks, setTasks] = useState(defaultTask)
    
    const addTask = (task) => {
      let newTask = {
        ...task,
        id: generateId(),
        createdAt: new Date().toLocaleDateString()
      }
      // console.log(newTask, 49)
      // console.log("add Task called")
      setTasks(prev => [...prev, newTask]);
    }
    // console.log(tasks)

    const deleteTask = (taskId) => {
      let newTasks = tasks.filter(item => item.id !== taskId);
      setTasks(newTasks)
      console.log("Task Deleted")
    }
    return {
      addTask,
      tasks,
      deleteTask
    };
  }

  
