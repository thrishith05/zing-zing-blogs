import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md sticky top-0 z-50 border-b-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide">
          logo
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="#" className="hover:underline underline-offset-4">Home</a>
          <a href="#" className="hover:underline underline-offset-4">About</a>
          <a href="#" className="hover:underline underline-offset-4">Singup</a>
          <a href="#" className="hover:underline underline-offset-4">login</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-lg animate-slide-down">
          <a href="#" className="block hover:underline">Home</a>
          <a href="#" className="block hover:underline">About</a>
          <a href="#" className="block hover:underline">Services</a>
          <a href="#" className="block hover:underline">Contact</a>
        </div>
      )}
    </nav>
  );
}
