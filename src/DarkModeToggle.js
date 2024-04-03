import React, { useState, useEffect } from 'react';
import './DarkModeToggle.scss'; // Importing styles for the toggle switch

// Function to get the user's preferred theme from localStorage
const getUserTheme = () => {
	const theme = localStorage.getItem('theme') || 'dark'; // Default theme is 'dark' if not set
	return theme === 'dark' ? true : false; // Convert theme to boolean (true for 'dark', false for 'light')
};

// DarkModeToggle component
const DarkModeToggle = () => {
	const [isDarkMode, setIsDarkMode] = useState(getUserTheme()); // State for dark mode state

	// Effect to update document class and localStorage when dark mode state changes
	useEffect(() => {
		document.documentElement.className = `${isDarkMode && 'dark'}`; // Add 'dark' class to document if dark mode is enabled
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Update theme in localStorage based on dark mode state
	}, [isDarkMode]); // Dependency array with isDarkMode

	// Render the dark mode toggle switch
	return (
		<div className='toggle-btn'>
			<input type="checkbox" id="toggle" checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)}/>
			<label htmlFor="toggle"></label>
		</div>
	);
};

export default DarkModeToggle; // Export the DarkModeToggle component
