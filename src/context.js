import React, { useState, useContext, useRef } from "react";

// Function to get tasks from localStorage
const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Create a new context for the application
const AppContext = React.createContext(null);

// Provider component to manage global state and provide it to child components
const AppProvider = ({ children }) => {
  const inputRef = useRef(null); // Ref for input field
  const [tasks, setTasks] = useState(getTasks()); // State for tasks
  const [alert, setAlert] = useState({ show: false, msg: "" }); // State for alerts
  const [isEditing, setIsEditing] = useState(false); // State for editing mode
  const [editId, setEditId] = useState(null); // State for editing task ID
  const [name, setName] = useState(""); // State for task name
  const [filter, setFilter] = useState("all"); // State for task filtering
  const [isColorsOpen, setIsColorsOpen] = useState(false); // State for color picker visibility
  const [location, setLocation] = useState({}); // State for color picker location
  const refContainer = useRef(null); // Ref for container element

  // Function to remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showAlert(true, "Task Removed.");
  };

  // Function to toggle task completion
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    showAlert(true, "Task State Changed.");
  };

  // Function to set editing mode and task data for editing
  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus();
  };

  // Function to show an alert message
  const showAlert = (show, msg) => {
    setAlert({ show, msg });
  };

  // Function to show the color picker
  const showColors = (e, id) => {
    const { top, right } = e.target.getBoundingClientRect();
    setLocation({ top, right, id });
    setIsColorsOpen(true);
  };

  // Provide the context value to child components
  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        removeTask,
        toggleDone,
        refContainer,
        alert,
        showAlert,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        editTask,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
        location,
        setLocation,
        isColorsOpen,
        setIsColorsOpen,
        showColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the global context
const useGlobalContext = () => {
  return useContext(AppContext);
};

// Export the context, provider, and custom hook
export { AppContext, AppProvider, useGlobalContext };
