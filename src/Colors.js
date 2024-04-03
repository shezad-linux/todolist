import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";

const Colors = () => {
  const { location, setIsColorsOpen, tasks, setTasks } = useGlobalContext(); // Using useGlobalContext hook to access global state
  const colorsRef = useRef(null); // Creating a ref for the colors container

  useEffect(() => {
    const { top, right } = location; // Destructuring location object to get top and right values
    // Setting the position of the colors container based on location
    colorsRef.current.style.left = `${right + 30}px`;
    colorsRef.current.style.top = `${top - 20}px`;
  }, [location]); // Running the effect when location changes

  // Function to change the color of a task
  const changeColor = (e) => {
    const color = e.target.style.backgroundColor; // Getting the background color of the clicked span
    const { id } = location; // Getting the id of the task from location
    // Updating the color of the task in the tasks array
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...task, color: color } : task;
      })
    );
    setIsColorsOpen(false); // Closing the colors container after selecting a color
  };

  // Rendering the colors container with clickable color options
  return (
    <div ref={colorsRef} className='color-container'>
      {/* Color options with onClick event to change color */}
      <span style={{ backgroundColor: "#eb1313" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#e91e63" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#673ab7" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#009688" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#4caf50" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#00bcd4" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#ff5722" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#607d8b" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#795548" }} onClick={changeColor}></span>
    </div>
  );
};

export default Colors;
