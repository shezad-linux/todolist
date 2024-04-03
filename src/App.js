import React, { useEffect } from "react";
import { FaGithub } from 'react-icons/fa'; // Importing FaGithub icon from react-icons/fa
import { v4 as uuid } from "uuid"; // Importing uuid for generating unique IDs
import { DragDropContext } from "react-beautiful-dnd"; // Importing DragDropContext for drag and drop functionality
import List from "./List"; // Importing List component
import Alert from "./Alert"; // Importing Alert component
import { useGlobalContext } from "./context"; // Importing useGlobalContext hook
import Colors from "./Colors"; // Importing Colors component
import DarkModeToggle from './DarkModeToggle'; // Importing DarkModeToggle component

const App = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext(); // Using useGlobalContext hook to access global state and functions

  // Function to add a new task or edit an existing task
  const addTask = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!name) {
      showAlert(true, "Invalid Task Name!"); // Show alert if task name is empty
    } else if (name && isEditing) {
      // Edit existing task if editing mode is active
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name } : task;
        })
      );
      setIsEditing(false); // Disable editing mode
      setEditId(null); // Clear edit ID
      setName(""); // Clear task name input
      showAlert(true, "Task Edited."); // Show alert for task edited
    } else {
      // Add new task if not in editing mode
      const newTask = {
        id: uuid().slice(0, 8), // Generate unique ID for the task
        name: name,
        completed: false,
        color: "#009688", // Default color for the task
      };
      setTasks([...tasks, newTask]); // Add the new task to the tasks list
      showAlert(true, "Task Added."); // Show alert for task added
      setName(""); // Clear task name input
    }
  };

  // Function to handle task filtering based on status (all, completed, uncompleted)
  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]); // Set the filter based on the button clicked
  };

  // Function to delete all tasks
  const deleteAll = () => {
    setTasks([]); // Clear the tasks list
    showAlert(true, "Your list is clear!"); // Show alert for list cleared
  };

  // Effect hook to focus on the task input field and save tasks to localStorage
  useEffect(() => {
    inputRef.current.focus(); // Focus on the task input field
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
  }, [inputRef, tasks]); // Dependencies for the effect hook

  // Function to handle drag and drop of tasks within the list
  const handleDragEnd = (param) => {
    const srcI = param.source.index; // Index of the source task
    const desI = param.destination?.index; // Index of the destination task (if dropped)
    if (desI) {
      const reOrdered = [...tasks]; // Create a copy of the tasks array
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]); // Reorder the tasks based on drag and drop
      setTasks(reOrdered); // Update the tasks list with the reordered tasks
    }
  };

  // Function to hide the Colors component when clicking outside of it
  const hideColorsContainer = (e) => {
    if (e.target.classList.contains("btn-colors")) return; // Check if the click is inside the Colors component
    setIsColorsOpen(false); // Hide the Colors component
  };

  // Render the main application UI
  return (
    <>
      <div className='container' onClick={hideColorsContainer}>
        {isColorsOpen && <Colors />} {/* Render the Colors component if isColorsOpen is true */}
        {alert && <Alert msg={alert.msg} />} {/* Render the Alert component if alert exists */}
        <form className='head' onSubmit={addTask}> {/* Form for adding/editing tasks */}
          <input
            type='text'
            ref={inputRef}
            placeholder='New Task'
            value={name}
            onChange={(e) => setName(e.target.value)} // Update task name as user types
          />
          <button type='submit'>{isEditing ? "Edit" : "Add"}</button> {/* Submit button text based on editing mode */}
        </form>
        <div className='filter'>
          {/* Buttons for filtering tasks */}
          <button
            data-filter='all'
            className={filter === "all" ? "active" : ""}
            onClick={filterTasks}
          >
            All
          </button>
          <button
            data-filter='completed'
            className={filter === "completed" ? "active" : ""}
            onClick={filterTasks}
          >
            Completed
          </button>
          <button
            data-filter='uncompleted'
            className={filter === "uncompleted" ? "active" : ""}
            onClick={filterTasks}
          >
            Uncompleted
          </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {tasks.length > 0 ? (
            <List /> // Render the List component if there are tasks
          ) : (
            <p className='no-tasks'>Your list is clear!</p> // Display message if no tasks
          )}
        </DragDropContext>
        {tasks.length > 2 && (
          <button
            className='btn-delete-all'
            onClick={deleteAll}
            title='Delete All Tasks (Completed and Uncompleted)!'
          >
            Clear All
          </button>
        )}
        <DarkModeToggle /> {/* Render the DarkModeToggle component */}
      </div>
      <div className="footer">
        <a href=' https://github.com/shezad-linux' target='_blank' rel="noopener noreferrer">
          <FaGithub className='github' /> {/* GitHub link with FaGithub icon */}
        </a>
      </div>
    </>
  );
};

export default App;
