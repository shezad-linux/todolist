import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

// Component for displaying alerts
const Alert = ({ msg }) => {
  const { tasks, refContainer, alert, showAlert } = useGlobalContext();

  useEffect(() => {
    // Set the position of the alert based on whether it should be shown or hidden
    refContainer.current.style.left = `${alert.show ? "15px" : "-100%"}`;

    // Set a timeout to hide the alert after 4 seconds
    const timeout = setTimeout(() => {
      refContainer.current.style.left = "-100%";
      showAlert(false, alert.msg);
    }, 4000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [alert, refContainer, showAlert, tasks]);

  // Return the JSX for the alert component
  return (
    <p ref={refContainer} className='alert'>
      {msg}
    </p>
  );
};

export default Alert;
