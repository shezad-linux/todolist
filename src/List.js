import React from "react";
import { Droppable } from "react-beautiful-dnd"; // Importing Droppable component for drag and drop
import { useGlobalContext } from "./context"; // Importing global context for accessing tasks and filter
import Task from "./Task"; // Importing Task component

// List component to display tasks
const List = () => {
  const { tasks, filter } = useGlobalContext(); // Using global context to get tasks and filter

  let filtered = [...tasks]; // Copying tasks initially

  // Filtering tasks based on the selected filter
  switch (filter) {
    case "all":
      filtered = [...tasks]; // Display all tasks
      break;
    case "completed":
      filtered = tasks.filter((task) => task.completed); // Display completed tasks
      break;
    case "uncompleted":
      filtered = tasks.filter((task) => !task.completed); // Display uncompleted tasks
      break;
    default:
      filtered = [...tasks];
      break;
  }

  // Rendering the droppable area for tasks
  return (
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <ul
          className='tasks-wrapper'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {/* Mapping through filtered tasks to render Task components */}
          {filtered.map((task, i) => (
            <Task key={task.id} {...task} index={i} />
          ))}
          {provided.placeholder} {/* Placeholder for dropped items */}
        </ul>
      )}
    </Droppable>
  );
};

export default List; // Exporting the List component
