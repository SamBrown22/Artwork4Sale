"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import ThemeButton from "./ThemeButton"
import Sidebar from "./Sidebar"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/", alwaysVisible: true },
  { name: "Login", href: "/signup-login", loggedOutOnly: true },
  { name: "My Products", href: "/my-products", loggedInOnly: true },
  { name: "My Cart", href: "/myCart", loggedInOnly: true},
  { name: "My Profile", href: "/myProfile", loggedInOnly: true },
  { name: "Logout", href: "/", loggedInOnly: true, action: "logout" },
]

function Taskbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const renderMenuItems = () =>
    navigation
      .filter(
        (item) =>
          item.alwaysVisible ||
          (item.loggedInOnly && session) ||
          (item.loggedOutOnly && !session),
      )
      .map((item) => (
        <li key={item.name}>
          {item.action === "logout" ? (
            <button
              onClick={() => signOut({ callbackUrl: item.href })}
              className="btn btn-ghost w-full rounded-lg"
            >
              {item.name}
            </button>
          ) : (
            <a href={item.href} className="btn btn-ghost w-full rounded-lg">
              {item.name}
            </a>
          )}
        </li>
      ))

  return (
    <div className="taskbar max-h-24 min-h-20 bg-base-300 p-4 shadow-md">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <ThemeButton />
          <h1 className="ml-2 text-xl font-bold">Artwork4Sale</h1>
        </div>

        <div className="flex items-center me-6">
          {/* Menu items for larger screens */}
          <ul className="menu menu-horizontal hidden p-0 lg:flex">
            {renderMenuItems()}
          </ul>

          {/* Profile Picture Section */}
          {session && session.user?.image && (
            <div
              className={`relative ml-4 hidden h-12 w-12 overflow-hidden rounded-full lg:block`}
            >
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {/* Hamburger menu button */}
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

        {/* Sidebar */}
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
