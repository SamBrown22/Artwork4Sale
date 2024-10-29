// src/components/Taskbar.tsx

"use client";

import React, { useState } from "react";
import ThemeButton from "./ThemeButton";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/add-product" },
  { name: "Contact", href: "#contact" },
];

function Taskbar() {
  const [isOpen, setIsOpen] = useState(false);

  const renderMenuItems = () =>
    navigation.map((item) => (
      <li key={item.name}>
        <a
          href={item.href}
          className="btn btn-ghost rounded-lg"
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </a>
      </li>
    ));

  return (
    <div className="taskbar bg-base-300 p-4 shadow-md">
      <nav className="flex items-center justify-between">
        {/* Group ThemeButton and heading in a div */}
        <div className="flex items-center">
          <ThemeButton />
          <h1 className="text-xl font-bold ml-2">Artwork4Sale</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="menu menu-horizontal hidden p-0 lg:flex">
          {renderMenuItems()}
        </ul>

        {/* Mobile Dropdown Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul className="menu dropdown-content mt-2 w-52 rounded-box bg-base-200 p-2 shadow">
              {renderMenuItems()}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Taskbar;