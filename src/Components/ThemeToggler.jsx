import React from "react";

const ThemeToggler = ({ theme, setTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full 
      shadow-inner flex items-center px-1 cursor-pointer transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Knob */}
      <span
        className={`absolute top-1 w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-all duration-300 ease-in-out
          ${isDark ? "translate-x-8" : "translate-x-0"}`}
      ></span>

      {/* Sun Icon */}
      <span className={`absolute left-2 text-yellow-500 text-sm transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0Z" />
        </svg>
      </span>

      {/* Moon Icon */}
      <span className={`absolute right-2 text-gray-800 dark:text-gray-200 text-sm transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggler;