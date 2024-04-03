import React from "react";
import { Draggable } from "react-beautiful-dnd"; // Importing Draggable component for drag and drop
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
  MdOutlineColorLens,
} from "react-icons/md"; // Importing icons from react-icons
import { FiEdit } from "react-icons/fi"; // Importing edit icon
import { useGlobalContext } from "./context"; // Importing global context for task actions

// Task component representing an individual task
const Task = ({ id, name, completed, color, index }) => {
  const { removeTask, toggleDone, editTask, showColors } = useGlobalContext(); // Using global context for task actions

  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 5rem #666" : "none",
            opacity: snapshot.isDragging
              ? "1"
              : provided.draggableProps.style.opacity,
            backgroundColor: color,
          }}
          className={`task ${completed && "task-done"}`}
        >
          <p>{name}</p>
          {/* Button to toggle task completion */}
          <button onClick={() => toggleDone(id)}>
            {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </button>
          {/* Button to delete task */}
          <button onClick={() => removeTask(id)}>
            <MdDeleteOutline />
          </button>
          {/* Button to edit task */}
          <button onClick={() => editTask(id)}>
            <FiEdit />
          </button>
          {/* Button to show color options */}
          <button className='btn-colors' onClick={(e) => showColors(e, id)}>
            <MdOutlineColorLens className='preventClick' />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Task; // Exporting the Task component
