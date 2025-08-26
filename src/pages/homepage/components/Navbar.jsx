import React from "react";

const Navbar = () => {
  const handleNavigation = (href) => {
    window.location.href = href;
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/favicon.ico" alt="SkillSphere Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">SkillSphere</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => handleNavigation("/homepage")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/community-explorer")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Communities
          </button>
          <button
            onClick={() => handleNavigation("/project-workspace")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavigation("/knowledge-hub")}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Knowledge Hub
          </button>
        </div>

        {/* Login and Sign Up Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleNavigation("/login")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigation("/signup")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;