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
      dueDate: "2026-02-01",
      isCompleted: false,
      createdAt: new Date(Date.now() - 86400000), // yesterday date
    },
    {
      id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, bread, vegetables",
      priority: "medium",
      status: "in-progress",
      categoryId: "3",
      isCompleted: true,
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      title: "Morning workout",
      priority: "low",
      status: "completed",
      categoryId: "2",
      isCompleted: true,
      createdAt: new Date(Date.now() - 259200000),
    },
  ];

  
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  export function useTodo() {

    const [tasks, setTasks] = useState(defaultTask)
    const [selectId, setSelectId] = useState(null);
    
    const addTask = (task) => {
      let newTask = {
        ...task,
        id: generateId(),
        isCompleted: false,
        createdAt: new Date().toLocaleDateString()
      }
      setTasks(prev => [...prev, newTask]);
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
    }

    return {
      addTask,
      tasks,
      deleteTask,
      updateTask,
      selectId, setSelectId,
      
    };
  }

  
