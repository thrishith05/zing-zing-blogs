import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md sticky top-0 z-50 border-b-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">logo</div>

        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink to="/" className="hover:underline underline-offset-4">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline underline-offset-4">
            About
          </NavLink>
          <NavLink to="/signup" className="hover:underline underline-offset-4">
            Signup
          </NavLink>
          <NavLink to="/login" className="hover:underline underline-offset-4">
            Login
          </NavLink>
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-lg animate-slide-down">
          <NavLink to="/" className="block hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="block hover:underline">
            About
          </NavLink>
          <NavLink to="/signup" className="block hover:underline">
            Signup
          </NavLink>
          <NavLink to="/login" className="block hover:underline">
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}
