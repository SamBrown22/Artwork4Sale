"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import ThemeButton from "./ThemeButton"
import Sidebar from "./Sidebar"

// Define navigation items with visibility rules
const navigation = [
  { name: "Home", href: "/", alwaysVisible: true }, // Always visible
  { name: "Add Product", href: "/add-product", loggedInOnly: true }, // Visible only when logged in
  { name: "Login", href: "/signup-login", loggedOutOnly: true }, // Visible only when logged out
  {name: 'My Profile', href: '/myProfile', loggedInOnly: true}, // Visible only when logged in
  { name: "Logout", href: "/", loggedInOnly: true, action: "logout" }, // Visible only when logged in and triggers logout
]

function Taskbar() {
  const [isOpen, setIsOpen] = useState(false) // State to manage the sidebar menu visibility
  const { data: session } = useSession() // Access the user session information

  // Function to render navigation items based on session status
  const renderMenuItems = () =>
    navigation
      // Filter items based on session status and visibility rules
      .filter(
        (item) =>
          item.alwaysVisible || // Always show items with `alwaysVisible: true`
          (item.loggedInOnly && session) || // Show items marked `loggedInOnly` if the user is logged in
          (item.loggedOutOnly && !session), // Show items marked `loggedOutOnly` if the user is logged out
      )
      // Map over filtered items to generate the JSX for each menu item
      .map((item) => (
        <li key={item.name} className="p-2">
          {item.action === "logout" ? (
            // Render logout button and perform signOut action when clicked
            <button
              onClick={() => signOut({ callbackUrl: item.href })}
              className="btn btn-ghost w-full rounded-lg"
            >
              {item.name}
            </button>
          ) : (
            // Render standard navigation link for all other items
            <a href={item.href} className="btn btn-ghost w-full rounded-lg">
              {item.name}
            </a>
          )}
        </li>
      ))

  return (
    <div className="taskbar max-h-24 min-h-20 bg-base-300 p-4 shadow-md">
      <nav className="flex items-center justify-between">
        {/* Left side of the taskbar - ThemeButton and App Title */}
        <div className="flex items-center">
          <ThemeButton />
          <h1 className="ml-2 text-xl font-bold">Artwork4Sale</h1>
        </div>

        {/* Desktop menu - displays items horizontally on large screens */}
        <ul className="menu menu-horizontal hidden p-0 lg:flex">
          {renderMenuItems()}
        </ul>

        {/* Mobile sidebar button - toggles sidebar visibility */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-ghost rounded-lg lg:hidden"
        >
          {/* Icon for the mobile menu button */}
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

        {/* Sidebar component for mobile menu - displays items vertically */}
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
