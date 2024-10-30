// src/components/Taskbar.tsx

"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import ThemeButton from "./ThemeButton"
import Sidebar from "./Sidebar"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Add product", href: "/add-product" },
  { name: "Login", href: "/signup-login"},
]

function Taskbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() // Get current path using usePathname

  const renderMenuItems = () =>
    navigation.map((item) => (
      <li key={item.name} className="p-2">
        <a
          href={item.href}
          className={`btn btn-ghost w-full rounded-lg hover:bg-primary hover:bg-opacity-10 ${
            pathname === item.href ? "underline underline-offset-4 decoration-primary" : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </a>
      </li>
    ))

  return (
    <div className="taskbar bg-base-300 p-4 shadow-md max-h-24 min-h-20">
      <nav className="flex items-center justify-between">
        {/* Group ThemeButton and heading in a div */}
        <div className="flex items-center">
          <ThemeButton />
          <h1 className="ml-2 text-xl font-bold">Artwork4Sale</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="menu menu-horizontal hidden p-0 lg:flex">
          {renderMenuItems()}
        </ul>

        {/* Mobile Sidebar Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-ghost rounded-lg lg:hidden"
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

        {/* Sidebar Component */}
        <Sidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          menuItems={renderMenuItems()}
        />
      </nav>
    </div>
  )
}

export default Taskbar
