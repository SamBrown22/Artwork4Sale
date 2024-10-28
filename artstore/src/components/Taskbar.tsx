'use client';
import React, { useState } from "react";

function Taskbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="taskbar bg-base-200 p-4 shadow-md">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Artwork4Sale</h1>
        
        {/* Desktop Menu */}
        <ul className="menu menu-horizontal p-0 hidden lg:flex">
          <li>
            <a href="/" className="btn btn-ghost rounded-lg">
              Home
            </a>
          </li>
          <li>
            <a href="/add-product" className="btn btn-ghost rounded-lg">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="btn btn-ghost rounded-lg">
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Dropdown Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn btn-ghost rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {isOpen && (
            <ul className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 mt-2">
              <li>
                <a href="/" onClick={() => setIsOpen(false)}>Home</a>
              </li>
              <li>
                <a href="/add-product" onClick={() => setIsOpen(false)}>About</a>
              </li>
              <li>
                <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Taskbar;
